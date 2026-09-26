// Content sourced and adapted from the SRS: AI-Powered Railway Track Fitting
// Inspection and Predictive Maintenance System Using QR Codes and Computer Vision.

export const workflow = [
  {
    step: "01",
    title: "Scan the fitting",
    copy: "An inspector scans the QR code fixed to a track fitting using a phone or USB camera in the field.",
  },
  {
    step: "02",
    title: "Retrieve asset record",
    copy: "The system pulls that fitting's identity, location, and full maintenance history from the central database.",
  },
  {
    step: "03",
    title: "Capture the image",
    copy: "The inspector photographs the fitting on site — no special equipment beyond a standard camera is required.",
  },
  {
    step: "04",
    title: "Detect defects with AI",
    copy: "A computer-vision model trained on rust, cracks, and missing bolts analyzes the image and flags what it finds.",
  },
  {
    step: "05",
    title: "Score fitting health",
    copy: "Findings are converted into a single health score, so severity is comparable across every fitting on the line.",
  },
  {
    step: "06",
    title: "Predict maintenance",
    copy: "Trends across past inspections are used to forecast when a fitting will next need attention.",
  },
  {
    step: "07",
    title: "Alert and report",
    copy: "The dashboard updates immediately, alerts go out for urgent cases, and reports are ready to export as PDF.",
  },
];

export const features = [
  {
    title: "QR-linked assets",
    copy: "Every fitting carries a unique QR code, so scanning it instantly surfaces the correct asset record — no manual lookup.",
    icon: "qr-code",
  },
  {
    title: "Computer-vision inspection",
    copy: "An AI model reviews each captured image for rust, cracks, and missing bolts, returning results in seconds.",
    icon: "scan-eye",
  },
  {
    title: "Health scoring",
    copy: "Defect findings roll up into a single, comparable health score for every fitting across the network.",
    icon: "activity",
  },
  {
    title: "Predictive maintenance",
    copy: "Inspection history feeds a forecast of when each fitting will likely need service, ahead of failure.",
    icon: "trending-up",
  },
  {
    title: "Inspection history",
    copy: "Every scan is logged with before/after imagery, so a fitting's condition over time is easy to trace.",
    icon: "history",
  },
  {
    title: "Live dashboard",
    copy: "Admins and inspectors see network-wide condition, open alerts, and recent activity in one view.",
    icon: "layout-dashboard",
  },
  {
    title: "Maintenance alerts",
    copy: "Fittings that cross a risk threshold raise an alert automatically, so nothing waits for the next manual round.",
    icon: "bell-ring",
  },
  {
    title: "Exportable reports",
    copy: "Inspection and maintenance summaries generate as clean, shareable PDF reports on demand.",
    icon: "file-output",
  },
];

export const roles = [
  {
    key: "admin",
    label: "Admin",
    description:
      "Registers and manages track fittings, oversees the inspector team, and monitors network-wide health from the analytics dashboard.",
    capabilities: [
      "Manage fitting and asset records",
      "Generate and assign QR codes",
      "View network-wide analytics",
      "Configure alert thresholds",
    ],
  },
  {
    key: "inspector",
    label: "Inspector",
    description:
      "Scans fittings in the field, captures inspection images, and reviews AI findings and health scores as they happen.",
    capabilities: [
      "Scan QR codes on site",
      "Capture and submit fitting images",
      "Review AI defect results",
      "Track assigned inspection history",
    ],
  },
];

export const stats = [
  { value: "< 3s", label: "to retrieve asset details after a QR scan" },
  { value: "< 5s", label: "for the AI to return an inspection result" },
  { value: "50+", label: "concurrent users supported on the dashboard" },
  { value: "3", label: "defect classes detected: rust, cracks, missing bolts" },
];

export const problems = [
  {
    title: "Slow, manual rounds",
    copy: "Walking every fitting by eye takes hours and doesn't scale across a growing network.",
  },
  {
    title: "Fittings go untracked",
    copy: "Without individual identity, it's difficult to know a fitting's age, history, or last inspection.",
  },
  {
    title: "Paper records get lost",
    copy: "Manual logs are error-prone and hard to recover after a failure or handover.",
  },
  {
    title: "Early damage is missed",
    copy: "Rust, hairline cracks, and missing bolts are easy to overlook during a quick visual check.",
  },
];
