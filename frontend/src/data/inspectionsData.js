// ---------------------------------------------------------------------------
// IMPORTANT: the backend you connected has no `inspections` table or API
// route at all (only `asset`, `users`, dashboard-stat and QR-code
// endpoints exist). So unlike assets, this module cannot be wired to the
// real database — there is nothing on the server to call.
//
// To keep the Inspections feature usable without inventing fake data, this
// starts completely empty and everything submitted here lives only in this
// browser tab's memory. It resets on refresh and is never saved to your
// database. Once a real inspections table + API exists on the backend,
// replace this whole module with calls into src/api/ the same way
// src/api/assets.js was done.
// ---------------------------------------------------------------------------

const imageSlots = ["Front", "Back", "Left", "Right", "Close-up"];

export const inspections = [];

export function getInspectionById(id) {
  return inspections.find((i) => i.id === id) ?? null;
}

export function getInspectionsByInspector(name) {
  if (!name) return [];
  return inspections.filter((i) => i.inspector === name);
}

// In-memory only — see the module note above.
let nextInspectionSeq = 1;
export function addInspection({ asset, aiResult, remarks, inspector }) {
  const now = new Date();
  const record = {
    id: `#${nextInspectionSeq++}`,
    assetId: asset.id,
    assetType: asset.type,
    location: asset.location,
    inspector: inspector || "Unknown Inspector",
    date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    status: "Completed",
    healthScore: aiResult.healthScore,
    remarks,
    images: imageSlots.map((label) => ({ label, uploaded: true })),
    aiResult,
  };
  inspections.unshift(record);
  return record;
}

export const imageSlotLabels = imageSlots;

const monthMap = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

// Converts "25 Sep 2026" -> "2026-09-25" so it can be compared against an
// <input type="date"> value.
export function toISODate(displayDate) {
  const [day, mon, year] = (displayDate || "").split(" ");
  if (!day || !mon || !year || !monthMap[mon]) return "";
  return `${year}-${monthMap[mon]}-${day.padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// There is no AI analysis endpoint on the backend either, so this is a
// clearly-labeled local placeholder that produces a plausible-looking
// result so the review screen has something to display. It is NOT a real
// defect detector. Replace with a real POST to an analysis endpoint once
// one exists on the backend.
// ---------------------------------------------------------------------------
export function runLocalPlaceholderAnalysis(asset) {
  const seed = (asset?.id ?? "000").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (offset, min, max) => {
    const x = Math.sin(seed + offset) * 10000;
    const frac = x - Math.floor(x);
    return Math.round(min + frac * (max - min));
  };

  const rustDetected = rand(1, 0, 100) > 65;
  const crackDetected = rand(2, 0, 100) > 80;
  const boltDetected = rand(3, 0, 100) > 85;

  const penalty = (rustDetected ? 20 : 0) + (crackDetected ? 30 : 0) + (boltDetected ? 35 : 0);
  const healthScore = Math.max(10, Math.min(98, 96 - penalty - rand(4, 0, 8)));

  return {
    fitting: { label: asset?.type ?? "Unknown", confidence: rand(5, 90, 99) },
    rust: { detected: rustDetected, confidence: rand(6, 55, 97) },
    crack: { detected: crackDetected, confidence: rand(7, 55, 97) },
    missingBolt: { detected: boltDetected, confidence: rand(8, 55, 97) },
    healthScore,
  };
}
