import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(116,82,108)",
    },
    secondary: {
      main: "#d89a15",
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 14,
    fontWeightBold: 800,
  },

  // typography: {
  //   fontFamily: "'Inter', sans-serif",
  // },
  // palette: {
  //   primary: {
  //     main: "rgb(154, 112, 149)",
  //   },
  //   error: {
  //     main: "rgb(200,153,51)",
  //   },
  // },
});

export default theme;
