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

        background: "#f6f3ec",
        foreground: "#1f1f1f",

        card: "#ffffff",
        "card-foreground": "#1f1f1f",

        primary: "#2f7d6d",
        "primary-foreground": "#ffffff",

        secondary: "#efe9dc",
        "secondary-foreground": "#1f1f1f",

        muted: "#e8e2d6",
        "muted-foreground": "#555555",

        accent: "#f3e7c9",
        "accent-foreground": "#1f1f1f",

        border: "#d6cfbf",
        ring: "#2f7d6d",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
