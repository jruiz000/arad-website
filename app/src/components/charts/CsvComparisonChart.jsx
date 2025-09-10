import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { parseSimpleCsv } from "../../utils/csv";
// gsap is used inside animateChartWithGsap
import { animateChartWithGsap } from "../../hooks/useGsapChartAnimation";

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
      const label = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
      ctx.font = ds.label === "Strategy" ? "600 12px Inter, system-ui, -apple-system, Segoe UI, Roboto" : "500 11px Inter, system-ui, -apple-system, Segoe UI, Roboto";
      ctx.fillStyle = ds.borderColor || "#fff";
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 3;
      ctx.strokeText(label, x, y);
      ctx.fillText(label, x, y);
    }
    ctx.restore();
  },
};
Chart.register(pctLabelsPlugin);

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
          tooltip: { enabled: false },
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
          y: { beginAtZero: true, ticks: { color: "#e5e7eb" }, grid: { color: "rgba(255,255,255,0.08)" } },
        },
        ...options,
      },
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate initial load and subsequent updates with GSAP growing from bottom
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

    // Animate from base of 0 to current values over ~5 seconds
    animateChartWithGsap(chartRef.current, chartData, {
      duration: 5.0,
      ease: "power2.out",
      fromBase: true,
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
