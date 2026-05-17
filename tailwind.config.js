/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        washi: '#F7F1E5',
        paper: '#FBF8F1',
        sumi: '#1F1B18',
        'ink-muted': '#5F5750',
        gold: '#C9A646',
        indigo: '#243B53',
        vermilion: '#B14A36',
      },
      fontFamily: {
        mincho: ['"Hiragino Mincho ProN"', '"Yu Mincho"', '"Noto Serif JP"', '"Noto Serif"', 'serif'],
        sans: ['"Hiragino Sans"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        golden: '1.618',
      },
    },
  },
  plugins: [],
}

