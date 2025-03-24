/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      backgroundImage: {
        "transparent-gradient": `
          linear-gradient(0deg, rgba(0,0,0,0.8911939775910365) 2%, rgba(0,0,0,0.8211659663865546) 10%, rgba(0,0,0,0.5438550420168067) 29%, rgba(0,0,0,0.15449929971988796) 70%),
          linear-gradient(180deg, rgba(0,0,0,0.8911939775910365) 2%, rgba(0,0,0,0.8211659663865546) 10%, rgba(0,0,0,0.5438550420168067) 29%, rgba(0,0,0,0.15449929971988796) 70%)
        `,
        "category-gradient": `
          linear-gradient(0deg, rgba(0,0,0,0.5438550420168067) 41%, rgba(128,125,125,0.15449929971988796) 70%)
        `,
        "device-gradient": `
           linear-gradient(210deg, rgba(250,10,10,0.44110854503464203) 0%, rgba(15,15,15,0.15449929971988796) 34%)
        `,
        "drop-gradient": `
           background: linear-gradient(0deg, rgba(0,0,0,0.5886729691876751) 35%, rgba(255,255,255,0.15449929971988796) 92%)
        `,
      },
    },
    screens: {
      sm: "640px", // Small screens (default)
      md: "768px", // Medium screens (default)
      lg: "1024px", // Large screens (default)
      xl: "1280px", // Extra-large screens (default)
      "2xl": "1536px", // New breakpoint for 2xl screens
      "3xl": "2560px", // New breakpoint for 2xl screens
      "6s": "490px",
      "5s": "390px",
    },
  },
  plugins: [],
};
