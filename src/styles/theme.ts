import { Poppins } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

const fontSize = 14; // px
// Tell Material-UI what's the font-size on the html element.
// 16px is the default font-size used by browsers.
const htmlFontSize = 16;
const coef = fontSize / 14;

export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const themeConfig: any = {
  palette: {
    // mode: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#F2884B",
    },
    error: {
      main: red.A400,
    },
    border: {
      main: grey[100],
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    pxToRem: (size: number) => `${(size / htmlFontSize) * coef}rem`,
  },
};

// Create a theme instance.
const theme = createTheme({ ...themeConfig });

export default theme;
