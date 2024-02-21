import { extendTheme } from "@chakra-ui/react";

export const brandColors = {
  orange: `#E46C1E`,
  black: `#0E1418`,
  red: `#F5253D`,
  green: `#419361`,
  white: `#ffffff`,
};

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 600,
        fontStyle: "italic",
        color: brandColors.white,
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
        bg: brandColors.black,
        color: brandColors.white,
      },
    },
  },
  colors: {
    brand: {
      black: brandColors.black,
      white: brandColors.white,
      orange: brandColors.orange,
      red: brandColors.red,
      green: brandColors.green,
    },
  },
});

export default theme;
