import { border, extendTheme } from "@chakra-ui/react";

export const brandColors = {
  // darkOrange: `rgba(228, 108, 30, 0.3)`,
  tan: "#e4b973",
  // ffTan: "#e4b973",
  lightPurple: "#753284",
  // ffLightPurple: "#753284",

  purple: "#33215f",
  // ffPurple: "#33215f",

  blue: "#7f90ff",
  // ffBlue: "#00687f",
  // blue: "#9EB4C7",
  // 7f90ff

  green: "#22a666",
  // ffGreen: "#22a666",
  // green: `#419361`,

  red: "#bf347d",
  // red: `#F5253D`,
  // ffPink: "#bf347d",

  orange: "#f35e35",
  // orange: `#E46C1E`,
  // ffOrange: "#f35e35",

  black: "#171126",
  // ffBlack: "#171126",
  // black: `#0E1418`,
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
