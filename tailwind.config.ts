import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        'gray-dark': 'var(--color-gray-dark)',
        'gray-medium': 'var(--color-gray-medium)',
        'gray-light': 'var(--color-gray-light)',
        'gray-darkest': 'var(--color-gray-darkest)',
        'green-theme': 'var(--color-green-theme)',
        'red-theme': 'var(--color-red-theme)',
        'orange-theme': 'var(--color-orange-theme)',
        'yellow-theme': 'var(--color-yellow-theme)',
      },
    },
  },
  plugins: [],
};
export default config;
