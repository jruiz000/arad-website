import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { parseSimpleCsv } from "../../utils/csv";
import { gsap } from "gsap";

// Plugin to draw live percentage labels near the latest point of each series
const pctLabelsPlugin = {
  id: "pctLabels",
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const baseArr = chart.$pctBase || [];
    ctx.save();
    for (let i = 0; i < chart.data.datasets.length; i++) {
      const ds = chart.data.datasets[i];
      const meta = chart.getDatasetMeta(i);
      if (!meta || meta.hidden) continue;
      const dataArr = ds.data || [];
      let lastIdx = -1;
      for (let j = dataArr.length - 1; j >= 0; j--) {
        const v = dataArr[j];
        if (v !== null && v !== undefined) { lastIdx = j; break; }
      }
      if (lastIdx < 0 || !meta.data || !meta.data[lastIdx]) continue;
      const elem = meta.data[lastIdx];
      const x = elem.x + 6; // slight offset to the right
      const y = elem.y - 6; // slight offset upward
      const base = Number(baseArr[i] ?? 0);
      const curr = Number(dataArr[lastIdx] ?? 0);
      if (!base) continue;
      const pct = ((curr / base) - 1) * 100;
      // Remove edge text labels; only keep a glowing dot for emphasized series
      if (ds.emphasized) {
        ctx.save();
        ctx.shadowColor = ds.borderColor || "#fff";
        ctx.shadowBlur = 16;
        ctx.fillStyle = ds.borderColor || "#fff";
        ctx.beginPath();
        ctx.arc(elem.x, elem.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();
  },
};
Chart.register(pctLabelsPlugin);

// Animate progressive point-by-point reveal using GSAP
function animateRevealByIndex(chart, newData, opts = {}) {
  const duration = opts.duration ?? 6.0;
  const ease = opts.ease ?? "power1.inOut";
  const baseValue = opts.baseValue ?? 0;
  // Apply labels
  const labels = newData.labels ? newData.labels.slice() : [];
  chart.data.labels = labels;
  const L = labels.length;
  // Clone target arrays per dataset
  const targets = newData.datasets.map((ds) => (Array.isArray(ds.data) ? ds.data.slice() : []));
  // Initialize datasets with nulls but keep styling
  chart.data.datasets = newData.datasets.map((ds) => ({
    ...ds,
    data: new Array(L).fill(null),
  }));
  // Precompute previous valid index for each point
  const prevIdxMap = targets.map((arr) => {
    const res = new Array(L).fill(-1);
    let last = -1;
    for (let j = 0; j < L; j++) {
      res[j] = last;
      const v = arr[j];
      if (v !== null && v !== undefined) last = j;
    }
    return res;
  });
  // Ensure base array exists for percent labels and tooltip
  if (!chart.$pctBase) {
    chart.$pctBase = newData.datasets.map((ds) => {
      for (let j = 0; j < L; j++) {
        const v = ds.data[j];
        if (v !== null && v !== undefined) return Number(v) || 0;
      }
      return 0;
    });
  }
  // Kill previous tweens and start
  gsap.killTweensOf(chart);
  const state = { p: 0 };
  chart.update("none");
  gsap.to(state, {
    p: Math.max(0, L - 1),
    duration,
    ease,
    onUpdate: () => {
      const p = state.p;
      const iFloor = Math.max(0, Math.floor(p));
      const frac = p - iFloor;
      for (let di = 0; di < chart.data.datasets.length; di++) {
        const ds = chart.data.datasets[di];
        const tgt = targets[di];
        const prevMap = prevIdxMap[di];
        for (let j = 0; j < L; j++) {
          if (j < iFloor) {
            ds.data[j] = tgt[j];
          } else if (j === iFloor) {
            const tv = tgt[j];
            if (tv === null || tv === undefined) {
              ds.data[j] = null;
            } else {
              const pk = prevMap[j];
              const sv = pk >= 0 ? (tgt[pk] ?? baseValue) : (chart.$pctBase?.[di] ?? baseValue);
              ds.data[j] = sv + (tv - sv) * frac;
            }
          } else {
            ds.data[j] = null;
          }
        }
      }
      // Update dynamic title with emphasized series % return
      const emphIndex = chart.data.datasets.findIndex((d) => d.emphasized);
      const dsIndex = emphIndex >= 0 ? emphIndex : (chart.data.datasets.length - 1);
      if (dsIndex >= 0) {
        const base = Number(chart.$pctBase?.[dsIndex] || 0);
        const ds = chart.data.datasets[dsIndex];
        let lastIdx = Math.min(iFloor, L - 1);
        while (lastIdx >= 0 && (ds.data[lastIdx] === null || ds.data[lastIdx] === undefined)) lastIdx--;
        if (base && lastIdx >= 0) {
          const curr = Number(ds.data[lastIdx] || 0);
          const pct = ((curr / base) - 1) * 100;
          const sign = pct >= 0 ? "+" : "";
          if (chart.options?.plugins?.title) {
            chart.options.plugins.title.text = `${ds.label || ""}: ${sign}${pct.toFixed(1)}%`;
          }
        }
      }
      chart.update("none");
    },
    onComplete: () => {
      // Snap to final targets
      for (let di = 0; di < chart.data.datasets.length; di++) {
        chart.data.datasets[di].data = targets[di].slice();
      }
      // Show tooltip on emphasized dataset's last point
      const emphIndex = newData.datasets.findIndex((d) => d.emphasized);
      const dsIndex = emphIndex >= 0 ? emphIndex : newData.datasets.length - 1;
      let lastIdx = L - 1;
      for (; lastIdx >= 0; lastIdx--) {
        const v = targets[dsIndex][lastIdx];
        if (v !== null && v !== undefined) break;
      }
      if (lastIdx >= 0) {
        chart.setActiveElements([{ datasetIndex: dsIndex, index: lastIdx }]);
      }
      // Final title update
      const base = Number(chart.$pctBase?.[dsIndex] || 0);
      if (base && lastIdx >= 0) {
        const curr = Number(targets[dsIndex][lastIdx] || 0);
        const pct = ((curr / base) - 1) * 100;
        const sign = pct >= 0 ? "+" : "";
        if (chart.options?.plugins?.title) {
          chart.options.plugins.title.text = `${newData.datasets[dsIndex]?.label || ""}: ${sign}${pct.toFixed(1)}%`;
        }
      }
      chart.update();
    },
  });
}

/**
 * CsvComparisonChart
 * - Fetches one or more CSV sources, aligns by date, and renders a line chart.
 * - Animates with GSAP on first load and on subsequent data updates.
 *
 * Props:
 *  - sources: Array<{ url: string, label: string, color?: string, valueField?: string }>
 *      valueField defaults to 'equity'.
 *  - options: Chart.js options (optional)
 */
export default function CsvComparisonChart({ sources = [], options }) {
  const [series, setSeries] = useState([]); // [{ label, color, points: [{date, value}] }]
  const [labels, setLabels] = useState([]); // sorted dates
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Colors for lines
  const colors = {
    meteorite: "#3C2074",
    geraldine: "#F89078",
    frenchRose: "#EA4F88",
    mediumRedViolet: "#A3319F",
    karry: "#FFE5D0",
  };

  // Heuristics to auto-detect date column and build datasets from headers
  function detectDateFieldFromRows(rows) {
    if (!rows || !rows.length) return "date";
    const keys = Object.keys(rows[0] || {});
    // Prefer header names containing 'date' or 'time'
    const preferred = keys.find((k) => /date|time/i.test(k));
    if (preferred) return preferred;
    // Fallback: pick the column with highest ratio of parseable dates
    let best = keys[0];
    let bestScore = -1;
    for (const k of keys) {
      let ok = 0;
      const total = Math.min(rows.length, 200);
      for (let i = 0; i < total; i++) {
        const v = rows[i][k];
        if (v && !Number.isNaN(Date.parse(v))) ok++;
      }
      const score = ok / total;
      if (score > bestScore) { bestScore = score; best = k; }
    }
    return best;
  }

  function buildSeriesAutoFromRows(rows) {
    if (!rows || !rows.length) return { series: [], labels: [] };
    const dateField = detectDateFieldFromRows(rows);
    const keys = Object.keys(rows[0] || {});
    const valueFields = keys.filter((k) => k !== dateField);
    // Build points per value field
    const byField = valueFields.map((vf) => {
      const pts = rows
        .map((r) => ({ date: r[dateField], value: Number(r[vf]) }))
        .filter((p) => p.date && !Number.isNaN(p.value));
      return { label: vf, color: undefined, points: pts };
    });
    // Union of dates
    const dateSet = new Set();
    byField.forEach((s) => s.points.forEach((p) => dateSet.add(p.date)));
    const allDates = Array.from(dateSet);
    allDates.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return { series: byField, labels: allDates };
  }

  // Fetch all CSVs and align by date. Supports per-source hasHeader/dateField/valueField.
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!sources || sources.length === 0) {
          setSeries([]);
          setLabels([]);
          return;
        }
        // If any source requests autoDetect, parse once and build all series from headers
        const wantsAuto = sources.some((s) => s.autoDetect);
        if (wantsAuto || (sources.length === 1 && !sources[0].valueField)) {
          const src = sources[0];
          const res = await fetch(src.url, { cache: "no-store" });
          if (!res.ok) throw new Error(`Failed to load ${src.url}`);
          const text = await res.text();
          const rows = parseSimpleCsv(text, { hasHeader: src?.hasHeader !== false });
          const { series: builtSeries, labels: builtLabels } = buildSeriesAutoFromRows(rows);
          if (!mounted) return;
          setLabels(builtLabels);
          setSeries(builtSeries);
        } else {
          const fetched = await Promise.all(
            sources.map(async (src) => {
              const res = await fetch(src.url, { cache: "no-store" });
              if (!res.ok) throw new Error(`Failed to load ${src.url}`);
              const text = await res.text();
              const rows = parseSimpleCsv(text, { hasHeader: src.hasHeader !== false });
              const valueField = src.valueField || "equity";
              const dateField = src.dateField || "date";
              const points = rows
                .map((r) => ({ date: r[dateField], value: Number(r[valueField] ?? 0) }))
                .filter((p) => p.date && !Number.isNaN(p.value));
              return { label: src.label, color: src.color, points };
            })
          );

          if (!mounted) return;

          // Compute union of dates and sort ascending
          const dateSet = new Set();
          fetched.forEach((s) => s.points.forEach((p) => dateSet.add(p.date)));
          const allDates = Array.from(dateSet);
          allDates.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

          setLabels(allDates);
          setSeries(fetched);
        }
      } catch (err) {
        console.error("CsvComparisonChart load error:", err);
        if (!mounted) return;
        setSeries([]);
        setLabels([]);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [JSON.stringify(sources)]);

  const chartData = useMemo(() => {
    if (!labels.length || !series.length) return null;
    // Build map per series to align with labels
    const baseDatasets = series.map((s, idx) => {
      const map = new Map(s.points.map((p) => [p.date, p.value]));
      const data = labels.map((d) => map.get(d) ?? null);
      const palette = [colors.meteorite, colors.frenchRose, colors.geraldine, colors.mediumRedViolet];
      const isEmphasized = (s.label || "").toLowerCase().includes("strategy") || (s.label || "").toLowerCase().includes("arad");
      const common = {
        label: s.label,
        data,
        borderColor: s.color || palette[idx % palette.length],
        backgroundColor: s.color || palette[idx % palette.length],
        borderWidth: isEmphasized ? 3.5 : 2,
        tension: 0.35,
        pointRadius: 0,
        spanGaps: true,
        fill: false,
        emphasized: isEmphasized,
      };
      return common;
    });
    // Ensure emphasized series draws on top by making it the last dataset
    const emphasized = baseDatasets.filter((d) => d.emphasized);
    const others = baseDatasets.filter((d) => !d.emphasized);
    const datasets = [...others, ...emphasized];
    return { labels, datasets };
  }, [labels, series]);

  // Init chart
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Start with an empty chart
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: true, position: "top", labels: { color: "#fff" } },
          title: {
            display: true,
            text: "",
            color: "#ffffff",
            font: { size: 18, weight: "700" },
            padding: { top: 8, bottom: 12 },
          },
          tooltip: {
            enabled: true,
            mode: "nearest",
            intersect: false,
            displayColors: false,
            filter: (item) => {
              const ds = item.dataset || {};
              return !!ds.emphasized;
            },
            callbacks: {
              label: (ctx) => {
                const ds = ctx.dataset || {};
                const chart = ctx.chart;
                const baseArr = chart.$pctBase || [];
                const dsIndex = ctx.datasetIndex ?? 0;
                const base = Number(baseArr[dsIndex] || 0);
                const y = Number(ctx.parsed?.y ?? 0);
                if (!base) return `${ds.label || ""}: ${y.toLocaleString()}`;
                const pct = ((y / base) - 1) * 100;
                const sign = pct >= 0 ? "+" : "";
                return `${ds.label || ""}: ${sign}${pct.toFixed(1)}%`;
              },
            },
          },
          decimation: { enabled: true, algorithm: "lttb" },
        },
        hover: { mode: null }, // Disable hover interactions
        scales: {
          x: {
            type: "time",
            time: {
              unit: "year",
              displayFormats: { year: "yyyy" },
            },
            adapters: { date: { locale: enUS } },
            ticks: { color: "#e5e7eb", major: { enabled: true } },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
          y: {
            beginAtZero: false,
            min: 50000,
            max: 200000,
            ticks: { color: "#e5e7eb" },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
        },
        ...options,
      },
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate initial load and subsequent updates with GSAP point-by-point reveal
  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    // Store base values for percentage labels (first non-null per dataset)
    const baseForPct = chartData.datasets.map((ds) => {
      for (let i = 0; i < ds.data.length; i++) {
        const v = ds.data[i];
        if (v !== null && v !== undefined) return Number(v) || 0;
      }
      return 0;
    });
    chartRef.current.$pctBase = baseForPct;

    // Point-by-point reveal with glowing head and final tooltip
    animateRevealByIndex(chartRef.current, chartData, {
      duration: 7.0,
      ease: "power2.out",
      baseValue: 0,
    });
  }, [chartData]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="CSV-driven comparison chart"
      />
    </div>
  );
}
