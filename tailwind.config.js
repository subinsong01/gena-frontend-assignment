/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#15D798",
        "primary-color-hover": "#13B47A",
        "error-color": "#ef4444",
      },
      fontFamily: {
        sans: ['"Pretendard"', "sans-serif"],
        pretendard: ['"Pretendard"', "sans-serif"],
        title: ['"JalnanGothic"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
