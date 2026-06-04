import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        border: "#1e1e2e",
        muted: "#2a2a3e",
        "muted-foreground": "#6b6b8a",
        foreground: "#e8e8f0",
        "foreground-muted": "#a0a0b8",
        primary: "#7c3aed",
        "primary-hover": "#6d28d9",
        "primary-glow": "#7c3aed33",
        accent: "#06b6d4",
        "accent-glow": "#06b6d433",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        xp: "#fbbf24",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.3)",
        "glow-accent": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-success": "0 0 20px rgba(16, 185, 129, 0.3)",
        pixel: "4px 4px 0px rgba(0,0,0,0.5)",
      },
      animation: {
        "xp-fill": "xpFill 1s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "level-up": "levelUp 0.5s ease-out forwards",
      },
      keyframes: {
        xpFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--xp-width)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        levelUp: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
