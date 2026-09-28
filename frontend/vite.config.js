import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // The backend's own port comes from its .env (PORT=...). Point this at
  // whatever that value is — the backend's .env sets PORT=3000, so that is
  // the default here too (override with VITE_BACKEND_URL if you change it).
  const backendTarget = env.VITE_BACKEND_URL || "http://localhost:3000";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Forwarded server-side, so the browser never makes a cross-origin
        // request — this is what lets the frontend talk to the backend
        // without needing any CORS changes on the backend itself.
        "/api": {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
