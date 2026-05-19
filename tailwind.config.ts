import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a2744",
        accent: "#00c896",
        "accent-dark": "#00a07a",
        accent2: "#f7a800",
        danger: "#e74c3c",
        info: "#4a6cf7",
        surface: "#f5f7fb",
        card: "#ffffff",
        muted: "#8590a2",
        border: "#e2e8f0",
      },
      fontFamily: {
        sarabun: ["var(--font-sarabun)", "sans-serif"],
        prompt: ["var(--font-prompt)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-sm": "10px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(26,39,68,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
