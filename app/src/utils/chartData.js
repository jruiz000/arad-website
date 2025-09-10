/**
 * Transform a simple JSON array of points into Chart.js data for the comparison chart.
 *
 * Input format example:
 * [
 *   { date: "2024-01", sp500: 100, nasdaq: 100, strategy: 100 },
 *   { date: "2024-02", sp500: 102, nasdaq: 101, strategy: 103 },
 * ]
 *
 * Returns a Chart.js data object:
 * {
 *   labels: ["2024-01", "2024-02"],
 *   datasets: [
 *     { label: "S&P 500", data: [...] },
 *     { label: "NASDAQ", data: [...] },
 *     { label: "Strategy", data: [...] }
 *   ]
 * }
 */
export function formatComparisonData(points) {
  if (!Array.isArray(points)) return { labels: [], datasets: [] };

  const labels = points.map((p) => p.date ?? "");
  const sp = points.map((p) => Number(p.sp500 ?? 0));
  const ndq = points.map((p) => Number(p.nasdaq ?? 0));
  const strat = points.map((p) => Number(p.strategy ?? 0));

  return {
    labels,
    datasets: [
      {
        label: "S&P 500",
        data: sp,
      },
      {
        label: "NASDAQ",
        data: ndq,
      },
      {
        label: "Strategy",
        data: strat,
      },
    ],
  };
}
