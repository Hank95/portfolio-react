/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      // Color system
      colors: {
        // Background scale (dark theme)
        bg: {
          DEFAULT: '#0a0a0b',
          subtle: '#141415',
          muted: '#1c1c1e',
        },
        // Text scale
        text: {
          DEFAULT: '#fafafa',
          muted: '#a1a1aa',
          subtle: '#71717a',
        },
        // Accent (single color, used sparingly)
        accent: {
          DEFAULT: '#3b82f6',
          muted: '#1d4ed8',
        },
        // Status colors
        status: {
          live: '#22c55e',
          building: '#f59e0b',
          professional: '#3b82f6',
        },
        // Border
        border: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
        },
      },

      // Typography
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.4' }],
      },

      // Spacing conventions documented
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      // Effects
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.4)',
      },

      // Transitions
      transitionDuration: {
        DEFAULT: '150ms',
        '400': '400ms',
      },

      // Border radius
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },

      // Animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate
  ],
}
