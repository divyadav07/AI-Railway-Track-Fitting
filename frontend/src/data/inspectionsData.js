// ---------------------------------------------------------------------------
// PLACEHOLDER DATA ONLY — same note as assetsData.js. Replace `inspections`
// with a real fetch to your existing backend and keep the shape, or adjust
// components in components/inspections/ to match your real field names.
// ---------------------------------------------------------------------------

const imageSlots = ["Front", "Back", "Left", "Right", "Close-up"];

function placeholderImages() {
  return imageSlots.map((label) => ({ label, uploaded: true }));
}

export const inspections = [
  {
    id: "#1024",
    assetId: "004",
    assetType: "Rail Clip",
    location: "KM 245/7",
    inspector: "Rahul Sharma",
    date: "25 Sep 2026",
    time: "10:24 AM",
    status: "Completed",
    healthScore: 25,
    remarks: "Visible corrosion along the clip edge and a hairline crack near the base. Recommend urgent maintenance.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Rail Clip", confidence: 96 },
      rust: { detected: true, confidence: 91 },
      crack: { detected: true, confidence: 78 },
      missingBolt: { detected: false, confidence: 88 },
    },
  },
  {
    id: "#1023",
    assetId: "017",
    assetType: "Fish Plate",
    location: "KM 246/2",
    inspector: "Priya Singh",
    date: "25 Sep 2026",
    time: "09:10 AM",
    status: "Completed",
    healthScore: 31,
    remarks: "One retaining bolt missing on the outer edge. Flagged for immediate bolt replacement.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Fish Plate", confidence: 94 },
      rust: { detected: false, confidence: 85 },
      crack: { detected: false, confidence: 90 },
      missingBolt: { detected: true, confidence: 93 },
    },
  },
  {
    id: "#1022",
    assetId: "023",
    assetType: "Rail Clip",
    location: "KM 248/3",
    inspector: "Amit Yadav",
    date: "24 Sep 2026",
    time: "04:42 PM",
    status: "Under Review",
    healthScore: 35,
    remarks: "Possible missing bolt — awaiting admin confirmation on AI reading before closing.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Rail Clip", confidence: 89 },
      rust: { detected: true, confidence: 62 },
      crack: { detected: false, confidence: 81 },
      missingBolt: { detected: true, confidence: 74 },
    },
  },
  {
    id: "#1021",
    assetId: "012",
    assetType: "Rail Clip",
    location: "KM 250/4",
    inspector: "Rahul Sharma",
    date: "24 Sep 2026",
    time: "11:05 AM",
    status: "Completed",
    healthScore: 81,
    remarks: "No visible defects. Fitting in good condition.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Rail Clip", confidence: 97 },
      rust: { detected: false, confidence: 95 },
      crack: { detected: false, confidence: 96 },
      missingBolt: { detected: false, confidence: 94 },
    },
  },
  {
    id: "#1020",
    assetId: "015",
    assetType: "Fish Plate",
    location: "KM 247/2",
    inspector: "Priya Singh",
    date: "23 Sep 2026",
    time: "02:30 PM",
    status: "Completed",
    healthScore: 69,
    remarks: "Light rust forming near one edge. Recommend preventive treatment within 30 days.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Fish Plate", confidence: 92 },
      rust: { detected: true, confidence: 58 },
      crack: { detected: false, confidence: 90 },
      missingBolt: { detected: false, confidence: 91 },
    },
  },
  {
    id: "#1019",
    assetId: "003",
    assetType: "Fish Plate",
    location: "KM 246/8",
    inspector: "Rahul Sharma",
    date: "24 Sep 2026",
    time: "08:55 AM",
    status: "Completed",
    healthScore: 88,
    remarks: "Minor surface rust, well within acceptable range.",
    images: placeholderImages(),
    aiResult: {
      fitting: { label: "Fish Plate", confidence: 95 },
      rust: { detected: true, confidence: 41 },
      crack: { detected: false, confidence: 93 },
      missingBolt: { detected: false, confidence: 92 },
    },
  },
];

export function getInspectionById(id) {
  return inspections.find((i) => i.id === id) ?? null;
}

export function getInspectionsByInspector(name) {
  return inspections.filter((i) => i.inspector === name);
}

// Frontend-only "persistence" — pushes a freshly submitted inspection into
// the in-memory list so it immediately shows up in the Inspections list and
// its own detail page. Replace with a POST /api/inspections call (and let
// the backend be the source of truth) once your endpoint is available.
let nextInspectionSeq = 1025;
export function addInspection({ asset, aiResult, remarks, inspector = "Rahul Sharma" }) {
  const now = new Date();
  const record = {
    id: `#${nextInspectionSeq++}`,
    assetId: asset.id,
    assetType: asset.type,
    location: asset.location,
    inspector,
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
// <input type="date"> value. Swap this out once real records carry ISO dates.
export function toISODate(displayDate) {
  const [day, mon, year] = displayDate.split(" ");
  if (!day || !mon || !year || !monthMap[mon]) return "";
  return `${year}-${monthMap[mon]}-${day.padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Placeholder "AI engine" call. This stands in for a real request to your
// backend's inspection/analyze endpoint (e.g. POST /api/inspections/analyze
// with the uploaded images) — swap the body of this function for that fetch
// once the endpoint is available; the return shape below is what the rest of
// the inspection UI (AIResultsPanel, review step, detail page) expects.
// ---------------------------------------------------------------------------
export function runMockAIAnalysis(asset) {
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

