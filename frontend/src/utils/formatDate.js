// The backend returns MySQL DATE columns through mysql2, which serialises them
// as full ISO timestamps (e.g. "2025-01-14T18:30:00.000Z" for 2025-01-15 on a
// server running in IST). Slicing the first 10 characters would show the wrong
// day, so convert to the local calendar date instead.
export function toDateOnly(value) {
  if (!value) return "";
  const str = String(value);
  // Already a plain date - nothing to convert.
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str.slice(0, 10);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
