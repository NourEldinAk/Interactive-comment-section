/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        moderateBlue: 'hsl(238, 40%, 52%)',
        softRed:'hsl(358, 79%, 66%)',
        lightGrayish: 'hsl(239, 57%, 85%)',
        paleRed: 'hsl(357, 100%, 86%)',
        darkBlue: 'hsl(212, 24%, 26%)',
        grayBlue: 'hsl(211, 10%, 45%)',
        lightGray:'hsl(223, 19%, 93%)',
        veryLightGray:'hsl(228, 33%, 97%)',
      }
    },
  },
  plugins: [],
}


