import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import GlobalStyle from "./GlobalStyles";
import { GlobalStateProvider } from "./context/GlobalStateContext";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={8}>
          <GlobalStateProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </GlobalStateProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
