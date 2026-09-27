# RailSentry — Frontend

Frontend-only React + Tailwind CSS app for the AI-Powered Railway Track Fitting
Inspection and Predictive Maintenance System. No backend, database, or auth
logic is included — this is the UI layer only.

## Stack

- React 18 + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- React Router (`/`, `/login`, `/register`, `/dashboard/admin`)
- Framer Motion (marketing pages only — entrance/scroll reveals)
- Recharts (dashboard charts)
- lucide-react (icons)
- Fraunces + Inter (Google Fonts, loaded in `index.html`)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Pages

| Route              | File                                   | Notes |
|--------------------|-----------------------------------------|-------|
| `/`                | `src/pages/LandingPage.jsx`            | Marketing site: hero, workflow, features, roles, stats |
| `/login`           | `src/pages/LoginPage.jsx`              | Split-panel login, Admin / Inspector role toggle — submitting routes to the matching dashboard below |
| `/register`        | `src/pages/RegisterPage.jsx`           | Split-panel signup, same role toggle |
| `/dashboard/admin`     | `src/pages/dashboard/AdminDashboard.jsx`     | Admin analytics dashboard (unchanged, font updated to Fraunces) |
| `/dashboard/inspector` | `src/pages/dashboard/InspectorDashboard.jsx` | Inspector's personal dashboard |
| `/dashboard/admin/assets` | `src/pages/assets/AssetsPage.jsx` | Admin: search/filter, add/edit/delete, QR management |
| `/dashboard/inspector/assets` | `src/pages/assets/AssetsPage.jsx` | Inspector: read-only + "Start New Inspection" |
| `/dashboard/{role}/assets/:id` | `src/pages/assets/AssetDetailPage.jsx` | Health, status, inspection + maintenance history |
| `/dashboard/admin/inspections` | `src/pages/inspections/InspectionsPage.jsx` | Admin: monitor/review all inspections, filter by asset/inspector/date/status |
| `/dashboard/inspector/inspections` | `src/pages/inspections/InspectionsPage.jsx` | Inspector: own inspection history + "New Inspection" |
| `/dashboard/inspector/inspections/new` | `src/pages/inspections/NewInspectionPage.jsx` | 5-step wizard: Asset → Images → AI Analysis → Review → Submit |
| `/dashboard/{role}/inspections/:id` | `src/pages/inspections/InspectionDetailPage.jsx` | Images, AI results, defects, health, remarks |

## Assets & Inspections — role behavior

Both modules reuse **one page per feature** for both roles, switching only the
available actions (per the SRS's Admin vs Inspector permissions) rather than
forking into separate admin/inspector page trees:

- **Assets** (`AssetsPage`, `AssetDetailPage`): Admin gets Add/Edit/Delete/QR
  management; Inspector gets the same layout read-only plus "Start New
  Inspection". Role is passed in as a prop from the route (`role="admin"` /
  `role="inspector"`) — swap that for your real authenticated user's role
  once JWT auth is wired in.
- **Inspections** (`InspectionsPage`, `InspectionDetailPage`,
  `NewInspectionPage`): Admin only ever monitors/reviews (no "New Inspection"
  entry point is rendered for that role at all). Inspector gets their own
  history plus the full inspection workflow.
- The New Inspection wizard's `runMockAIAnalysis()` in `inspectionsData.js`
  stands in for a real call to your AI/analysis endpoint — swap its body,
  keep the return shape (`fitting`, `rust`, `crack`, `missingBolt`,
  `healthScore`), and `AIResultsPanel` keeps working unchanged.


Copy for the landing page is centralized in `src/data/content.js`, sourced
from the SRS (workflow steps, features, roles, non-functional-requirement
stats).

## Dashboard — wiring to your real backend

**Nothing in the app calls a real API or assumes a database schema.**
Every number/record currently comes from plain data modules:

```
src/data/dashboardData.js     — Admin dashboard stats/charts
src/data/inspectorData.js     — Inspector dashboard stats
src/data/assetsData.js        — Assets list + detail (getAssetById)
src/data/inspectionsData.js   — Inspections list + detail (getInspectionById,
                                 addInspection, runMockAIAnalysis)
```

Each export is shaped like a plausible response so the UI has something real
to render. To connect it to your real backend:

1. Replace the static exports / mock functions above with `fetch`/React
   Query calls to your actual endpoints, keeping the same shape (or adjust
   the components to match your real field names).
2. No endpoint URLs, field names, or JWT/auth flow have been invented — send
   me your backend routes/schema (or the backend code itself) and I'll wire
   the real calls in instead of guessing.
3. Login and Register forms (`onSubmit` in `LoginPage.jsx` / `RegisterPage.jsx`)
   currently just `console.log` the form values and route locally by the
   selected role — swap that for your real auth request once you share the
   endpoint, and drive `role` (currently a route param) from the decoded JWT
   instead.

## Design tokens

Dashboard-specific colors live under the `brand` key in `tailwind.config.js`
(`brand-bg`, `brand-mint`, `brand-crit`, `brand-warn`, `brand-info`, etc.) and
match the palette you specified. The marketing/auth pages use a separate,
slightly warmer palette (`ink`, `signal`, `sand`, `amber`) — both coexist
without conflict since they're namespaced.

## Folder structure

```
src/
  components/          shared UI (Navbar, Footer, Logo, RoleCard, Modal, cards...)
    dashboard/         dashboard-only widgets (Sidebar, Topbar, charts, tables, StatusPill)
    assets/            AssetsTable, AssetFilters, AssetFormModal, QRCodeModal, AssetHealthBar
    inspections/       InspectionsTable, InspectionFilters, AIResultsPanel, ImageUploadGrid,
                        StepIndicator, steps/ (StepAsset, StepImages, StepAnalysis, StepReview, StepSuccess)
  data/                content.js, dashboardData.js, inspectorData.js, assetsData.js, inspectionsData.js
  layouts/             DashboardLayout.jsx (role-aware sidebar/topbar, Fraunces applied here)
  pages/               LandingPage, LoginPage, RegisterPage
    dashboard/         AdminDashboard.jsx, InspectorDashboard.jsx
    assets/            AssetsPage.jsx, AssetDetailPage.jsx
    inspections/       InspectionsPage.jsx, InspectionDetailPage.jsx, NewInspectionPage.jsx
```
