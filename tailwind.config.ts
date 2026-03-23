import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  safelist: [
    'from-orange-600', 'to-red-700',
    'from-blue-700', 'to-indigo-800',
    'from-green-600', 'to-teal-700',
    'from-purple-700', 'to-pink-700',
    'from-rose-700', 'to-pink-800',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
        },
        secondary: '#FF6B35',
        success: '#00C851',
        warning: '#FFB800',
        danger: '#FF3547',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
