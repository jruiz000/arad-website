import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { animateChartWithGsap } from "../../hooks/useGsapChartAnimation";

/**
 * LineComparisonChart
 * - Reusable line chart component that compares S&P 500, Nasdaq, and Strategy
 * - Uses Chart.js for rendering and GSAP for smooth animations on load and updates
 *
 * Props:
 *  - data: {
 *      labels: (string[]|number[]),
 *      datasets: Array<{ label: string, data: number[], borderColor?: string, backgroundColor?: string, tension?: number }>
 *    }
 *  - options: Chart.js options (optional)
 */
export default function LineComparisonChart({ data, options }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const firstRenderRef = useRef(true);

  // Brand colors (from tailwind.config.js in README)
  const colors = {
    meteorite: "#3C2074",
    geraldine: "#F89078",
    frenchRose: "#EA4F88",
    mediumRedViolet: "#A3319F",
    karry: "#FFE5D0",
  };

  // Fallback demo data if no data prop provided
  const demoData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "S&P 500",
        data: [100, 102, 101, 104, 103, 107, 110, 112],
        borderColor: colors.meteorite,
        backgroundColor: colors.meteorite,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        fill: false,
      },
      {
        label: "NASDAQ",
        data: [100, 101, 103, 106, 108, 109, 113, 115],
        borderColor: colors.frenchRose,
        backgroundColor: colors.frenchRose,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        fill: false,
      },
      {
        label: "Strategy",
        data: [100, 103, 105, 109, 112, 118, 122, 128],
        borderColor: colors.geraldine,
        backgroundColor: colors.geraldine,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        fill: false,
      },
    ],
  };

  const chartData = data || demoData;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Initialize chart with zeroed data to allow GSAP to animate from 0 on first render
    const zeroedDatasets = chartData.datasets.map((ds) => ({
      ...ds,
      data: ds.data.map(() => 0),
    }));

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: zeroedDatasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Disable Chart.js built-in animation; GSAP will control frames
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: true, position: "top", labels: { color: "#fff" } },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            ticks: { color: "#e5e7eb" },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#e5e7eb" },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
        },
        ...options,
      },
    });

    // First animation from zero
    animateChartWithGsap(chartRef.current, chartData, { duration: 1.2, ease: "power2.out", fromZero: true });
    firstRenderRef.current = false;

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate when data changes
  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartData) return;
    // Subsequent updates animate from current values to new ones
    animateChartWithGsap(chartRef.current, chartData, { duration: 1.0, ease: "power2.out", fromZero: false });
  }, [chartData]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Comparative performance chart of S&P 500, Nasdaq, and Strategy"
      />
    </div>
  );
}
