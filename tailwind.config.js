/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "380px",
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "main-screen": "1440px",
      "2xl": "1536px",
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      lightblue: "#f2fdfa",
      "gray-25": "#FCFCFD",
      "gray-50": "#F9FAFB",
      "gray-100": "#F2F4F7",
      "gray-200": "#E4E7EC",
      "gray-300": "#D0D5DD",
      "gray-400": "#98A2B3",
      "gray-500": "#667085",
      "gray-600": "#475467",
      "gray-700": "#344054",
      "gray-800": "#1D2939",
      "gray-900": "#101828",
      "gray-1000": "#161616",
      white: "#FFFFFF",
      slate: "#F4F4F4",
      "slate-100": "#F5F5F5",
      cobalt: "#0029F5",
      navy: "#020934",
      sky: "#D5FFFF",
      sea: "#26FCC7",
      tangerine: "#FC690C",
      black: "#03020A",
      "primary-purple-25": "#FCFAFF",
      "primary-purple-50": "#F9F5FF",
      "primary-purple-100": "#F4EBFF",
      "primary-purple-200": "#E9D7FE",
      "primary-purple-300": "#D6BBFB",
      "primary-purple-400": "#B692F6",
      "primary-purple-500": "#9E77ED",
      "primary-purple-600": "#7F56D9",
      "primary-purple-700": "#6941C6",
      "primary-purple-800": "#53389E",
      "primary-purple-900": "#42307D",
      "error-25": "#FFFBFA",
      "error-50": "#FEF3F2",
      "error-100": "#FEE4E2",
      "error-200": "#FECDCA",
      "error-300": "#FDA29B",
      "error-400": "#F97066",
      "error-500": "#F04438",
      "error-600": "#D92D20",
      "error-700": "#B42318",
      "error-800": "#912018",
      "error-900": "#7A271A",
      "warning-25": "#FFFCF5",
      "warning-50": "#FFFAEB",
      "warning-100": "#FEF0C7",
      "warning-200": "#FEDF89",
      "warning-300": "#FEC84B",
      "warning-400": "#FDB022",
      "warning-500": "#F79009",
      "warning-600": "#DC6803",
      "warning-700": "#B54708",
      "warning-800": "#93370D",
      "warning-900": "#7A2E0E",
      "success-25": "#F6FEF9",
      "success-50": "#ECFDF3",
      "success-100": "#D1FADF",
      "success-200": "#A6F4C5",
      "success-300": "#6CE9A6",
      "success-400": "#32D583",
      "success-500": "#12B76A",
      "success-600": "#039855",
      "success-700": "#027A48",
      "success-800": "#05603A",
      "success-900": "#054F31",
      "blue-gray-25": "#FCFCFD",
      "blue-gray-50": "#F8F9FC",
      "blue-gray-100": "#EAECF5",
      "blue-gray-200": "#C8CCE5",
      "blue-gray-300": "#9EA5D1",
      "blue-gray-400": "#717BBC",
      "blue-gray-500": "#4E5BA6",
      "blue-gray-600": "#3E4784",
      "blue-gray-700": "#363F72",
      "blue-gray-800": "#293056",
      "blue-gray-900": "#101323",
      "blue-light-25": "#F5FBFF",
      "blue-light-50": "#F0F9FF",
      "blue-light-100": "#E0F2FE",
      "blue-light-200": "#B9E6FE",
      "blue-light-300": "#7CD4FD",
      "blue-light-400": "#36BFFA",
      "blue-light-500": "#0BA5EC",
      "blue-light-600": "#0086C9",
      "blue-light-700": "#026AA2",
      "blue-light-800": "#065986",
      "blue-light-900": "#0B4A6F",
      "navy-blue-25": "#F5FAFF",
      "navy-blue-50": "#EFF8FF",
      "navy-blue-100": "#D1E9FF",
      "navy-blue-200": "#B2DDFF",
      "navy-blue-300": "#84CAFF",
      "navy-blue-400": "#53B1FD",
      "navy-blue-500": "#2E90FA",
      "navy-blue-600": "#1570EF",
      "navy-blue-700": "#175CD3",
      "navy-blue-800": "#1849A9",
      "navy-blue-900": "#194185",
      "indigo-25": "#F5F8FF",
      "indigo-50": "#EEF4FF",
      "indigo-100": "#E0EAFF",
      "indigo-200": "#C7D7FE",
      "indigo-300": "#A4BCFD",
      "indigo-400": "#8098F9",
      "indigo-500": "#6172F3",
      "indigo-600": "#444CE7",
      "indigo-700": "#3538CD",
      "indigo-800": "#2D31A6",
      "indigo-900": "#2D3282",
      "purple-25": "#FAFAFF",
      "purple-50": "#F4F3FF",
      "purple-100": "#EBE9FE",
      "purple-200": "#D9D6FE",
      "purple-300": "#BDB4FE",
      "purple-400": "#9B8AFB",
      "purple-500": "#7A5AF8",
      "purple-600": "#6938EF",
      "purple-700": "#5925DC",
      "purple-800": "#4A1FB8",
      "purple-900": "#3E1C96",
      "pink-25": "#FEF6FB",
      "pink-50": "#FDF2FA",
      "pink-100": "#FCE7F6",
      "pink-200": "#FCCEEE",
      "pink-300": "#FAA7E0",
      "pink-400": "#F670C7",
      "pink-500": "#EE46BC",
      "pink-600": "#DD2590",
      "pink-700": "#C11574",
      "pink-800": "#9E165F",
      "pink-900": "#851651",
      "rose-25": "#FFF5F6",
      "rose-50": "#FFF1F3",
      "rose-100": "#FFE4E8",
      "rose-200": "#FECDD6",
      "rose-300": "#FEA3B4",
      "rose-400": "#FD6F8E",
      "rose-500": "#F63D68",
      "rose-600": "#E31B54",
      "rose-700": "#C01048",
      "rose-800": "#A11043",
      "rose-900": "#89123E",
      "orange-25": "#FFFAF5",
      "orange-50": "#FFF6ED",
      "orange-100": "#FFEAD5",
      "orange-200": "#FDDCAB",
      "orange-300": "#FEB273",
      "orange-400": "#FD853A",
      "orange-500": "#FB6514",
      "orange-600": "#EC4A0A",
      "orange-700": "#C4320A",
      "orange-800": "#9C2A10",
      "orange-900": "#7E2410",
      "red-25": "#FED6DD",
      "red-50": "#FEADBB",
      "red-100": "#FD849A",
      "red-200": "#FD5B78",
      "red-300": "#FC3256",
      "mustard-25": "#FFF7DD",
      "mustard-50": "#FBE399",
      "mustard-100": "#FFE898",
      "mustard-200": "#FFE175",
      "mustard-300": "#FFD953",
      "blue-25": "#DBE1FD",
      "blue-50": "#B7C2FC",
      "blue-100": "#92A4FA",
      "blue-200": "#6E85F9",
      "blue-300": "#4A67F7",
    }),
    extend: {
      colors: {
        lightgreen: "#f2fdfa",
        lightcream: "#fff6eb",
        lightblue: "#f0f9ff",
        bordergreen: "#2bd4bd",
        darkblue: "#100E3B",
        "gray-100": "#f3f4f6",
        cobalt: "#0029F5",
        "indigo-25": "#F5F8FF",
        "gray-25": "#FCFCFD",
      },
    },
  },
  plugins: [],
};

