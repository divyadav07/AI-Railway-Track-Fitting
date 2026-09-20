/** @type {import('tailwindcss').Config} */
export default {
  // "class" (not the Tailwind default "media") makes dark mode follow the app's own
  // toggle (AppShell puts/removes a "dark" class on its wrapper div) instead of only
  // following the OS's prefers-color-scheme. Without this, every `dark:` utility class
  // in the app is inert and the sun/moon toggle button does nothing visible.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
