/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      correct: 'var(--color-correct)',
      incorrect: 'var(--color-incorrect)',
      bg: 'var(--color-bg)',
      text: 'var(--color-text)',
      box: 'var(--color-box)',
      ui: 'var(--color-ui)',
      upcoming: 'var(--color-upcoming)',
    }
  },
  plugins: [],
}