import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dp: {
          purple: "#883F9B",     // Passionate Purple (Primario Institucional)
          violaceous: "#BD93C6", // Fondos suaves / Hover
          blue: "#2A8ED1",       // Ticino Blueous (Botones principales / CTA)
          beige: "#F7F7E8",      // Pure Beige (Fondo neutro base)
          camel: "#A56A2E",      // Camel / Mostaza (Acentos y destacados)
          lavender: "#B2BFEB",   // Midsummer's Dream (Bordes y separadores)
        },
      },
      fontFamily: {
        sans: ["var(--font-acherus)", "system-ui", "sans-serif"],
        display: ["var(--font-bumbbled)", "var(--font-acherus)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;