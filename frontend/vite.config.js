import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forwards /api/* to the Express backend server-side, so the browser
      // never makes a cross-origin request and CORS never comes into play.
      // NOTE: matches PORT in backend/.env (currently 3000).
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
