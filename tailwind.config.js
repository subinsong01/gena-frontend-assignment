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
        "edit-color": "#2563eb",
        "edit-hover-color": "	#1d4ed8",
        "error-color": "#ef4444",
        "error-color-hover": "#dc2626",
        "information-color": "#6B7280",
        "input-box-color": "#D1D5DB",
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
