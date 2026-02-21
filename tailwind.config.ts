import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Cores principais neon
        'neon-purple': '#A855F7',
        'neon-cyan': '#22D3EE',
        'neon-pink': '#EC4899',
        'electric-blue': '#3B82F6',
        'victory-gold': '#FBBF24',
        
        // Backgrounds
        'deep-space': '#0A0118',
        'dark-void': '#1A0B2E',
        'card-dark': '#16082A',
        
        // Neutros
        'gray-dark': '#1F1B24',
        'gray-medium': '#2D2838',
        'gray-light': '#8B8B9F',
        
        // Status
        'success-green': '#10B981',
        'danger-red': '#EF4444',
        'warning-orange': '#F97316',

        // Shadcn compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#A855F7",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#22D3EE",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#2D2838",
          foreground: "#8B8B9F",
        },
        accent: {
          DEFAULT: "#FBBF24",
          foreground: "#0A0118",
        },
        popover: {
          DEFAULT: "#16082A",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#16082A",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
