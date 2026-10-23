export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f6f9fb',
        shell: '#e9f0f4',
        coal: '#0f2530',
        ember: '#f97316',
        cola: '#0f2530',
        cocoa: '#c2410c',
        sand: '#e6eef3',
        teal: '#0f766e',
        mint: '#ccfbf1',
        berry: '#e11d48',
        mustard: '#fbbf24',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(25,21,18,0.45)',
        lift: '0 28px 60px -28px rgba(25,21,18,0.55)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) both',
        pop: 'pop 0.28s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
