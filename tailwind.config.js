// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
      fontFamily: {
        sans: ["var(--font-exo)"],
        display: ["var(--font-permanent-marker)"],
        accent: ["var(--font-space-grotesk)"],
        playfair: ["var(--font-playfair)"],
        "source-serif": ["var(--font-source-serif)"],
        heading: ["var(--font-permanent-marker)"],
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
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
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
      typography: {
        newspaper: {
          css: {
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-links': '#111827',
            '--tw-prose-bold': '#111827',
            '--tw-prose-counters': '#6B7280',
            '--tw-prose-bullets': '#D1D5DB',
            '--tw-prose-hr': '#E5E7EB',
            '--tw-prose-quotes': '#111827',
            '--tw-prose-quote-borders': '#E5E7EB',
            '--tw-prose-captions': '#6B7280',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-code': '#E5E7EB',
            '--tw-prose-pre-bg': '#1F2937',
            '--tw-prose-th-borders': '#D1D5DB',
            '--tw-prose-td-borders': '#E5E7EB',
            '--tw-prose-invert-body': '#D1D5DB',
            '--tw-prose-invert-headings': '#FFF',
            '--tw-prose-invert-links': '#FFF',
            '--tw-prose-invert-bold': '#FFF',
            '--tw-prose-invert-counters': '#9CA3AF',
            '--tw-prose-invert-bullets': '#4B5563',
            '--tw-prose-invert-hr': '#374151',
            '--tw-prose-invert-quotes': '#F3F4F6',
            '--tw-prose-invert-quote-borders': '#374151',
            '--tw-prose-invert-captions': '#9CA3AF',
            '--tw-prose-invert-code': '#FFF',
            '--tw-prose-invert-pre-code': '#D1D5DB',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': '#4B5563',
            '--tw-prose-invert-td-borders': '#374151',
            'p': {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              lineHeight: '1.75',
            },
            'h1': {
              fontFamily: 'var(--font-playfair)',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
              fontWeight: '700',
            },
            'h2': {
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
              fontWeight: '600',
            },
            'h3': {
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
              fontWeight: '600',
            },
            'blockquote': {
              fontFamily: 'var(--font-source-serif)',
              fontStyle: 'italic',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              color: 'var(--tw-prose-quotes)',
            },
          },
        },
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
