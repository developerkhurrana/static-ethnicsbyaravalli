/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#222',
            fontFamily: 'Inter, sans-serif',
            h1: { color: '#1a1a1a', fontWeight: '700', marginBottom: '0.5em' },
            h2: { color: '#222', fontWeight: '600', marginTop: '1.5em', marginBottom: '0.5em' },
            h3: { color: '#333', fontWeight: '600', marginTop: '1em', marginBottom: '0.5em' },
            a: { color: '#D9A8A0', textDecoration: 'underline', fontWeight: '500' },
            strong: { color: '#1a1a1a', fontWeight: '700' },
            em: { color: '#444', fontStyle: 'italic' },
            ul: { paddingLeft: '1.5em', marginBottom: '1em' },
            ol: { paddingLeft: '1.5em', marginBottom: '1em' },
            blockquote: {
              borderLeft: '4px solid #D9A8A0',
              color: '#888',
              fontStyle: 'italic',
              paddingLeft: '1em',
              margin: '1em 0',
            },
            table: { width: '100%', marginBottom: '1em' },
            th: { backgroundColor: '#f9fafb', fontWeight: '600' },
            td: { backgroundColor: '#fff' },
            code: {
              backgroundColor: '#f3f4f6',
              color: '#d6336c',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontSize: '0.95em',
            },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}