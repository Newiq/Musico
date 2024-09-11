import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme1: {
          lightest: '#ffdfd6',
          light: '#e3a5c7',
          medium: '#b692c2',
          dark: '#694f8e'
        },
        theme2: {
          lightest: '#fff8e8',
          light: '#f7eed3',
          medium: '#aab396',
          dark: '#674636'
        },
        theme3: {
          lightest: '#ef9c66',
          light: '#fdc794',
          medium: '#c8cfa0',
          dark: '#78aba8'
        }
      },
    },
  },
  plugins: [],
};
export default config;
