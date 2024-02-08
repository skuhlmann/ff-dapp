import { extendTheme } from "@chakra-ui/react";

const brandColors = {
  gunmetal: `#0f1418`,
  graypeach: `#737373`,
  seaGreen: `#459262ff`,
  olive: `#7B7C36ff`,
  orange: `#e48c57`,
  orangered: `#e36c1e`,
  red: `#f02a45`,
  darkgreen: `#764421`,
  peachgreen: `#7b7c34`,
  peach: `#e46c1e`,
};

const theme = extendTheme({
  components: {
    Heading: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 600, // Normally, it is "semibold"
        fontStyle: "italic",
        color: brandColors.peach,
      },
      sizes: {},
      variants: {},
    },
  },
  fonts: {
    heading: `'auster', sans-serif`,
    body: `'Work Sans', sans-serif`,
    display: `'alda', serif`,
  },
  styles: {
    global: {
      body: {
        bg: brandColors.gunmetal,
        color: `#e9cece`,
      },
    },
  },
  colors: {
    orange: {
      50: "#ffebdf",
      100: "#ffc7b2",
      200: "#fca382",
      300: "#fa7e52",
      400: "#f75a22",
      500: "#dd4009",
      600: "#ad3105",
      700: "#7d2203",
      800: "#4c1300",
      900: "#1f0400",
    },
    green: {
      50: "#e5faec",
      100: "#c6e7d3",
      200: "#a6d7b9",
      300: "#85c69d",
      400: "#63b582",
      500: "#4a9c69",
      600: "#377950",
      700: "#265739",
      800: "#143521",
      900: "#001407",
    },
    gray: {
      50: "#e7f5fb",
      100: "#cadde8",
      200: "#a9c6d6",
      300: "#88aec5",
      400: "#6797b4",
      500: "#4e7d9b",
      600: "#3c6179",
      700: "#2b4657",
      800: "#172a35",
      900: "#020f16",
    },
    peach: {
      50: "#e7f5fb",
      100: "#cadde8",
      200: "#a9c6d6",
      300: "#88aec5",
      400: "#6797b4",
      500: brandColors.peach,
      600: "#3c6179",
      700: "#2b4657",
      800: "#172a35",
      900: "#020f16",
    },
  },
});

export default theme;

// /* CSS HEX */
// gunmetal: #152630ff;
// --sea-green: #459262ff;
// --olive: #7B7C36ff;
// --orange-crayola: #F97141ff;

// /* CSS HSL */
// --gunmetal: hsla(202, 39%, 14%, 1);
// --sea-green: hsla(143, 36%, 42%, 1);
// --olive: hsla(61, 39%, 35%, 1);
// --orange-crayola: hsla(16, 94%, 62%, 1);
