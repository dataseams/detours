import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7983c9",
      main: "#5865bc",
      dark: "#3d4683",
    },
    secondary: {
      main: "#F6F6F6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Jost",
    color: "#4f4f4f",
    fontSize: 18,
  },
  body: {
    fontSize: 18,
    lineHeight: "1.6em",
    color: "#4f4f4f",
  },
  h1: {
    mobile: {
      fontSize: 32,
      lineHeight: "1.4em",
    },
    desktop: {
      fontSize: 44,
      fontWeight: "bold",
      lineHeight: "1.3em",
    },
  },
  h2: {
    mobile: {
      fontSize: 24,
      fontWeight: 500,
    },
    desktop: {
      fontSize: 26,
      fontWeight: 500,
    },
  },
  h3: {
    color: "#5865bc",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: 600,
    paddingBottom: 8 * 1,
  },
  mainContainer: {
    mobile: {
      padding: 8 * 4,
    },
  },
});

export default theme;
