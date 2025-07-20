/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // App Router 경로
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Pages Router 경로 (사용하면)
    "./src/components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 폴더 경로
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#15D798",
        "primary-color-hover": "#13B47A",
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
