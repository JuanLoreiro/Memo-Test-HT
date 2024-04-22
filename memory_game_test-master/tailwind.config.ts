import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "accent-yellow": "#FDA214",
      "accent-yellow-light": "#FFC541",
      "grey1": "#BCCED9",
      "grey2": "#F2F2F2",
      "grey3": "#E8F2F5",
      "grey-white": "#FCFCFC",
      "cyan-blue": "#7191A5",
      "cyan-blue2": "#6395B8",
      "dark-cyan": "#304859",
      "dark-cyan2": "#152938",
      black: "#000000",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
