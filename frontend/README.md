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
| `/login`           | `src/pages/LoginPage.jsx`              | Split-panel login, Admin / Inspector role toggle |
| `/register`        | `src/pages/RegisterPage.jsx`           | Split-panel signup, same role toggle |
| `/dashboard/admin` | `src/pages/dashboard/AdminDashboard.jsx` | Admin analytics dashboard |

Copy for the landing page is centralized in `src/data/content.js`, sourced
from the SRS (workflow steps, features, roles, non-functional-requirement
stats).

## Dashboard — wiring to your real backend

**Nothing in the dashboard calls an API or assumes a database schema.**
Every number on `/dashboard/admin` currently comes from one file:

```
src/data/dashboardData.js
```

Each export in that file (`summaryStats`, `healthDistribution`,
`assetsByFittingType`, `criticalAssets`, `recentInspections`, etc.) is shaped
like a plausible response so the UI has something to render. To connect it to
your real backend:

1. Replace the static exports in `dashboardData.js` with `fetch`/React Query
   calls to your actual endpoints, keeping the same shape (or adjust the
   components in `src/components/dashboard/` to match your real field names).
2. No endpoint URLs, field names, or auth flow have been invented — send me
   your backend routes/schema (or the backend code itself) and I'll wire the
   real calls in instead of guessing.
3. Login and Register forms (`onSubmit` in `LoginPage.jsx` / `RegisterPage.jsx`)
   currently just `console.log` the form values — swap that for your real
   auth request once you share the endpoint.

## Design tokens

Dashboard-specific colors live under the `brand` key in `tailwind.config.js`
(`brand-bg`, `brand-mint`, `brand-crit`, `brand-warn`, `brand-info`, etc.) and
match the palette you specified. The marketing/auth pages use a separate,
slightly warmer palette (`ink`, `signal`, `sand`, `amber`) — both coexist
without conflict since they're namespaced.

## Folder structure

```
src/
  components/          shared UI (Navbar, Footer, Logo, RoleCard, cards...)
    dashboard/         dashboard-only widgets (Sidebar, Topbar, charts, tables)
  data/                content.js (marketing copy) + dashboardData.js (mock data)
  layouts/             DashboardLayout.jsx
  pages/               LandingPage, LoginPage, RegisterPage
    dashboard/         AdminDashboard.jsx
```
