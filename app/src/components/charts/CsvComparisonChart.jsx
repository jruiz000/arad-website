import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { parseSimpleCsv } from "../../utils/csv";
import { gsap } from "gsap";

// Custom plugin to clip the chart drawing area for a reveal effect
const revealPlugin = {
  id: "revealLine",
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea || chart.$revealProgress === undefined) return;
    const progress = chart.$revealProgress; // 0 -> 1
    const clipRight = chartArea.left + chartArea.width * progress;

    ctx.save();
    ctx.beginPath();
    ctx.rect(chartArea.left, chartArea.top, Math.max(0, clipRight - chartArea.left), chartArea.height);
    ctx.clip();
  },
  afterDatasetsDraw(chart) {
    if (chart.$revealProgress !== undefined) {
      chart.ctx.restore();
    }
  },
};

// Register reveal plugin globally
Chart.register(revealPlugin);

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

  // Fetch all CSVs and align by date
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
            const rows = parseSimpleCsv(text, { hasHeader: true });
            const valueField = src.valueField || "equity";
            const points = rows
              .map((r) => ({ date: r.date, value: Number(r[valueField] ?? 0) }))
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
    const datasets = series.map((s, idx) => {
      const map = new Map(s.points.map((p) => [p.date, p.value]));
      const data = labels.map((d) => map.get(d) ?? null);
      const palette = [colors.meteorite, colors.frenchRose, colors.geraldine, colors.mediumRedViolet];
      return {
        label: s.label,
        data,
        borderColor: s.color || palette[idx % palette.length],
        backgroundColor: s.color || palette[idx % palette.length],
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0,
        spanGaps: true,
        fill: false,
      };
    });
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
          tooltip: { enabled: false }, // Disable tooltips
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
          y: { ticks: { color: "#e5e7eb" }, grid: { color: "rgba(255,255,255,0.08)" } },
        },
        ...options,
      },
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate initial load with left-to-right reveal
  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    // Assign data to chart
    chartRef.current.data = chartData;

    // Use GSAP to animate the reveal
    chartRef.current.$revealProgress = 0;
    gsap.to(chartRef.current, {
      $revealProgress: 1,
      duration: 4, // 4-second animation
      ease: "none", // Linear animation
      onUpdate: () => {
        chartRef.current.update("none"); // Update chart without built-in animations
      },
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
