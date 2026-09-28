import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Alpine après-birthday" — plum ink on warm paper, apricot/lilac accents,
        // pine for the after-dark sections. See docs/DESIGN.md for the full system.
        paper: '#fcf8f1', // page ground
        'paper-card': '#f5ecdd', // card / oat surface
        'paper-deep': '#ebdbc6', // deeper card, borders

        ink: '#441828', // primary text, headings
        'ink-soft': '#6b3345', // secondary text

        apricot: '#f4b494', // primary accent / CTAs
        'apricot-deep': '#e69567',
        lilac: '#d9a6ec', // secondary accent, sparing
        pine: '#2f4a3a', // night / after-dark section bg
        'pine-light': '#3f6350',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(68,24,40,0.08), 0 8px 24px -12px rgba(68,24,40,0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
} satisfies Config
