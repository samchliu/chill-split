import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'rgb(var(--primary-foreground))',
        },
        brand: {
          orange: 'rgb(var(--brand-orange))',
          yellow: 'rgb(var(--brand-yellow))',
          green: 'rgb(var(--brand-green))',
          pink: 'rgb(var(--brand-pink))',
        },
      },
    },
  },
  plugins: [],
};
export default config;
