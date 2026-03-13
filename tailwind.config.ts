import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f1e9",
        ink: "#1f1f1f",
        "ink-muted": "#555555",
        rule: "#b9b1a6",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
