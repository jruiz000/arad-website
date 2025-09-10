import { gsap } from "gsap";

/**
 * Animate a Chart.js chart's datasets with GSAP.
 * - On initial load, you can animate from a base value (fromBase: true)
 * - On updates, it will tween from current values to the new values
 *
 * Usage:
 *   animateChartWithGsap(chartInstance, newData, { duration: 1.2, ease: 'power2.out', fromBase: true, delay: 0.3 })
 *
 * @param {import('chart.js').Chart} chart Chart.js chart instance
 * @param {{ labels: string[]|number[], datasets: Array<{ label: string, data: number[], [key:string]: any }> }} newData
 * @param {{ duration?: number, ease?: string, fromBase?: boolean, baseValue?: number, delay?: number }} options
 */
export function animateChartWithGsap(chart, newData, options = {}) {
  if (!chart) return;

  const duration = options.duration ?? 1.2;
  const ease = options.ease ?? "power2.out";
  const fromBase = options.fromBase ?? false;
  const baseValue = options.baseValue ?? 0;
  const delay = options.delay ?? 0;

  // Prepare previous state and target state
  const prevLabels = chart.data.labels ? [...chart.data.labels] : [];
  const nextLabels = newData.labels ? [...newData.labels] : [];

  // Ensure labels are set (no animation for labels, just swap)
  chart.data.labels = nextLabels;

  const prevDatasets = chart.data.datasets?.map((ds) => ({
    label: ds.label,
    data: Array.isArray(ds.data) ? ds.data.slice() : [],
  })) || [];

  const nextDatasets = newData.datasets.map((ds) => ({
    label: ds.label,
    data: Array.isArray(ds.data) ? ds.data.slice() : [],
  }));

  // Normalize lengths and ensure chart has the same dataset structure
  chart.data.datasets = newData.datasets.map((ds, i) => ({
    ...chart.data.datasets?.[i],
    ...ds, // keeps styling options coming from caller (colors, borderWidth, etc.)
    data: (fromBase && (!prevDatasets[i] || prevDatasets[i].data.length === 0))
      ? ds.data.map(() => baseValue)
      : (prevDatasets[i]?.data || ds.data.map(() => baseValue)),
  }));

  const prev = chart.data.datasets.map((ds) => ds.data.slice());
  const target = nextDatasets.map((ds) => ds.data.slice());

  // Make sure all arrays have same length as labels
  const L = nextLabels.length;
  for (let i = 0; i < target.length; i++) {
    if (target[i].length !== L) {
      // pad or trim target
      target[i] = target[i].slice(0, L);
      while (target[i].length < L) target[i].push(0);
    }
    if (prev[i].length !== L) {
      prev[i] = prev[i].slice(0, L);
      while (prev[i].length < L) prev[i].push(0);
    }
  }

  // Cancel any previous tweens tied to this chart
  gsap.killTweensOf(chart);

  const state = { t: 0 };

  gsap.to(state, {
    t: 1,
    duration,
    ease,
    delay,
    onUpdate: () => {
      const tt = state.t;
      for (let i = 0; i < chart.data.datasets.length; i++) {
        for (let j = 0; j < L; j++) {
          const v = prev[i][j] + (target[i][j] - prev[i][j]) * tt;
          chart.data.datasets[i].data[j] = v;
        }
      }
      // Update with no built-in Chart.js animation; GSAP controls frames
      chart.update("none");
    },
    onComplete: () => {
      // Snap to final values to avoid any rounding differences
      for (let i = 0; i < chart.data.datasets.length; i++) {
        chart.data.datasets[i].data = target[i].slice();
      }
      chart.update();
    },
  });
}
