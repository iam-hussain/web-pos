import { Poppins, Space_Grotesk, Lato } from "@next/font/google";
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

export const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const themeConfig: any = {
  palette: {
    // mode: "dark",
    primary: {
      main: "#534fff",
      // contrastText: "#fff",
    },
    secondary: {
      main: "#182122",
    },
    error: {
      main: red.A400,
    },
    border: {
      main: grey[100],
    },
    info: {
      main: "#ccf888",
    },
    neutral: {
      main: "#c1bffd",
    },
    background: {
      default: "#efefef",
      // paper: "#fff",
    },
  },
  drawerPaper: { background: "blue" },
  typography: {
    fontFamily: poppins.style.fontFamily,
    pxToRem: (size: number) => `${(size / htmlFontSize) * coef}rem`,
    h1: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    h2: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    h3: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    h4: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    h5: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    h6: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
    body2: {
      fontFamily: lato.style.fontFamily,
      color: grey[500],
    },
    button: {
      fontFamily: spaceGrotesk.style.fontFamily,
    },
  },
};

// Create a theme instance.
const theme = createTheme({ ...themeConfig });

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    neutral: true;
  }
}

export default theme;
