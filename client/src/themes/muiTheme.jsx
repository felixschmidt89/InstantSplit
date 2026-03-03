import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      light: "#5eb1c7",
      main: "#559cad",
      dark: "#4e8794",
      contrastText: "#fff",
    },
    error: {
      light: "#ef936c",
      main: "#ed7e4c",
      dark: "#ed692a",
      contrastText: "#fff",
    },
    grey: {
      light: "#707283",
      main: "#5c5e6f",
      dark: "#3d3f4f",
      contrastText: "#fff",
    },
  },
});

export default muiTheme;
