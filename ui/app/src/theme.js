import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7983c9",
      main: "#5865bc",
      dark: "#3d4683"
    },
    secondary: {
      main: "#F6F6F6"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    fontFamily: "Jost"
  }
});

export default theme;
