import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { animateChartWithGsap } from "../../hooks/useGsapChartAnimation";

/**
 * BarAnimatedChart
 * - Reusable bar chart with GSAP-driven "grow from zero" on mount
 * - Smooth transitions on data updates
 *
 * Props:
 *  - data: { labels: string[]|number[], datasets: Array<{ label: string, data: number[], backgroundColor?: string }>} 
 *  - options: Chart.js options (optional)
 */
export default function BarAnimatedChart({ data, options }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Demo fallback data if not provided
  const demoData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue",
        data: [120, 180, 150, 220],
        backgroundColor: "#3C2074",
        borderRadius: 6,
      },
    ],
  };

  const chartData = data || demoData;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Initialize with zeros to allow a "grow from zero" animation
    const zeroed = chartData.datasets.map((ds) => ({
      ...ds,
      data: ds.data.map(() => 0),
    }));

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: zeroed,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // disable built-in animation; GSAP controls frames
        plugins: {
          legend: { display: true, position: "top" },
          tooltip: { enabled: true },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
        ...options,
      },
    });

    // Initial grow animation
    animateChartWithGsap(chartRef.current, chartData, { duration: 1.0, fromZero: true });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    animateChartWithGsap(chartRef.current, chartData, { duration: 0.8, fromZero: false });
  }, [chartData]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
