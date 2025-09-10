/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Libre Caslon Text', 'serif'],
        'body': ['Inconsolata', 'monospace'],
      },
      colors: {
        // ARAD Brand Colors
        'ink-1': '#111111',
        'ink-2': '#555555',
        'bg-1': '#FFFFFF',
        'bg-2': '#FAFAFB',
        'meteorite': '#3C2074',
        'geraldine': '#F89078',
        'french-rose': '#EA4F88',
        'medium-red-violet': '#A3319F',
        'karry': '#FFE5D0',
        
        // Section Backgrounds
        'bg-navbar': '#180C2E',
        'bg-announcement': '#A3319F',
        'bg-hero': '#FFFFFF',
        'bg-features-1': '#180C2E',
        'bg-stats': '#FDE8E4',
        'bg-features-2': '#77351D',
        'bg-logos': '#180C2E',
        'bg-pricing': '#FFFFFF',
        'bg-blog': '#5D1F36',
        'bg-about': '#FFFFFF',
        'bg-faq': '#180C2E',
        'bg-footer': '#120922',
      },
      borderRadius: {
        'lg': '20px',
        'pill': '999px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #3C2074 0%, #A3319F 55%, #F89078 100%)',
      },
      spacing: {
        '18': '4.5rem',
      },
      minHeight: {
        '16': '4rem',
        '18': '4.5rem',
      },
      zIndex: {
        '999': '999',
      }
    },
  },
  plugins: [],
};

