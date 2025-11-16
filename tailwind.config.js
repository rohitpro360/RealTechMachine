/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // ✅ disables Tailwind reset
  },
  prefix: "tw-", // ✅ keeps Tailwind isolated
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};



