module.exports = {
  content: [
    './index.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.{html,md}',
    './_posts/**/*.md',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'town-blue': '#1e40af',
        'town-gray': '#64748b',
        'town-green': '#059669',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
