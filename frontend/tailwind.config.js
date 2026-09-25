/** @type {import('tailwindcss').Config} */
export default {
  // "class" makes dark mode follow the app's own toggle (AppShell puts/removes a
  // "dark" class on its wrapper div) instead of the OS prefers-color-scheme.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // RailSentry AI design tokens. `DEFAULT` / `light` / `dark` / `deep` / `soft`
      // are the landing-page tokens; the numeric steps let dashboard utilities
      // (text-ink-500, border-ink-200, bg-mint-50 ...) live on the same palette.
      colors: {
        ink: {
          DEFAULT: "#0A100D",
          light: "#111C17",
          dark: "#060A08",
          50: "#F5F4F0",
          100: "#EDEEE9",
          200: "#DFE4E0",
          300: "#C3CCC7",
          400: "#8A9E97",
          500: "#62766E",
          600: "#47594F",
          700: "#24352D",
          800: "#111C17",
          900: "#0A100D",
          950: "#060A08",
        },
        mint: {
          DEFAULT: "#2EE6A8",
          deep: "#14B385",
          soft: "#BFF4E1",
          50: "#E9FBF4",
          100: "#D3F7E8",
          200: "#BFF4E1",
          300: "#86EBC8",
          400: "#2EE6A8",
          500: "#1FCB94",
          600: "#14B385",
          700: "#0E8F6B",
          800: "#0B7359",
          900: "#085040",
        },
        rust: {
          DEFAULT: "#E2643C",
          50: "#FDF0EB",
          100: "#FBE0D6",
          200: "#F6C2AF",
          300: "#F0A283",
          400: "#EA8259",
          500: "#E2643C",
          600: "#C9522B",
          700: "#A84322",
          800: "#7F3319",
          900: "#5A2410",
          950: "#3A160A",
        },
        mist: {
          DEFAULT: "#9FB3AC",
          50: "#EEF3F1",
          100: "#DFE8E4",
          200: "#C9D8D2",
          300: "#B4C7BF",
          400: "#9FB3AC",
          500: "#6F8A80",
          600: "#4F6B60",
          700: "#3B5248",
          800: "#2A3C34",
        },
        fog: "#F5F4F0",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "rail-grid":
          "linear-gradient(rgba(46,230,168,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(46,230,168,0.10) 1px, transparent 1px)",
      },
      keyframes: {
        drift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "80px 80px" },
        },
        pulseRing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.18)", opacity: "0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        drift: "drift 12s linear infinite",
        pulseRing: "pulseRing 2.6s ease-out infinite",
        floatY: "floatY 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
