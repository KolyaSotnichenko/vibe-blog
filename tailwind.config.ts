import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--paper-bg)",
        foreground: "var(--ink)",
        muted: "var(--ink-muted)",
        border: "var(--border-ink)",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
