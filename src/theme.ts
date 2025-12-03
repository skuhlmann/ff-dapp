import { extendTheme } from "@chakra-ui/react";

export const brandColors = {
  tan: "#e4b973",
  lightPurple: "#753284",
  purple: "#33215f",
  blue: "#7f90ff",
  green: "#22a666",
  red: "#bf347d",
  orange: "#f35e35",
  black: "#171126",
  white: `#ffffff`,
  gray: `#1f1f1f`,
};

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "AntiqueStories",
        fontWeight: 100,
        color: brandColors.tan,
      },
    },
    Text: {
      baseStyle: {
        fontSize: "18px",
      },
    },
  },
  fonts: {
    heading: `'AntiqueStories', sans-serif`,
    body: `'Rockwell', serif`,
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
      // darkOrange: brandColors.darkOrange,
      gray: brandColors.gray,
      blue: brandColors.blue,
      purple: brandColors.purple,
      lightPurple: brandColors.lightPurple,
      tan: brandColors.tan,
    },
  },
});

export default theme;
