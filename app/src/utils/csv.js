/**
 * Simple CSV parser for well-formed CSV (no quoted commas, etc.).
 * Returns an array of objects keyed by header names.
 * If the CSV has headers in the first row, set hasHeader = true (default).
 */
export function parseSimpleCsv(text, { hasHeader = true } = {}) {
  if (typeof text !== "string" || text.trim().length === 0) return [];
  const lines = text.replace(/\r\n?/g, "\n").split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  let headers = [];
  let startIndex = 0;

  if (hasHeader) {
    headers = lines[0].split(",").map((h) => h.trim());
    startIndex = 1;
  } else {
    const cols = lines[0].split(",").length;
    headers = Array.from({ length: cols }, (_, i) => `col_${i}`);
  }

  const rows = [];
  for (let i = startIndex; i < lines.length; i++) {
    const parts = lines[i].split(",");
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = (parts[j] ?? "").trim();
    }
    rows.push(row);
  }
  return rows;
}
