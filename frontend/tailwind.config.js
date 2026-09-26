/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Core dark surface — deep rail-night navy, not pure black
        ink: {
          950: "#08111F",
          900: "#0B1626",
          800: "#101F35",
          700: "#172943",
          600: "#20365750",
        },
        // Warm neutral for light surfaces (form panels, cards)
        sand: {
          50: "#FBFAF7",
          100: "#F6F3EC",
          200: "#ECE7DA",
          300: "#DAD3C0",
        },
        // AI / tech accent — signal teal
        signal: {
          300: "#7EEFDD",
          400: "#45DCC4",
          500: "#22C1A8",
          600: "#189C88",
          700: "#127566",
        },
        // Inspection / alert accent — trackside amber
        amber: {
          300: "#F8CD82",
          400: "#F2AE45",
          500: "#E1922A",
          600: "#B9721A",
        },
        rust: {
          400: "#E07856",
          500: "#C85D3C",
        },
        // ---- RailSentry dashboard palette (exact tokens as specified) ----
        brand: {
          bg: "#07110E",      // deep green-black — sidebar / dark surfaces
          bgSoft: "#0D1B16",  // slightly lifted dark surface (hover/active rows)
          mint: "#2EE6A6",    // primary accent
          mintDark: "#20B884",
          off: "#F7F7F4",     // app background
          card: "#FFFFFF",    // card surface
          text: "#1F2925",    // primary text
          sub: "#5B6B64",     // secondary text
          border: "#E4E8E5",  // hairline border
          warn: "#F2B84B",    // warning / needs inspection
          warnBg: "#FDF2DF",
          crit: "#E05252",    // critical
          critBg: "#FBE6E6",
          info: "#4F8CFF",    // AI / informational
          infoBg: "#E9F0FF",
          ok: "#2EA96F",      // healthy / success text (darker than mint for AA contrast)
          okBg: "#E3F8EF",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(69, 220, 196, 0.25), 0 12px 40px -12px rgba(34, 193, 168, 0.35)",
        card: "0 1px 2px rgba(11, 22, 38, 0.06), 0 8px 24px -8px rgba(11, 22, 38, 0.12)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(220%)" },
        },
      },
      animation: {
        dash: "dash 2.4s linear forwards",
        floaty: "floaty 5s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        scanline: "scanline 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
