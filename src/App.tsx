import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import GlobalStyle from "./GlobalStyles";
import { GlobalStateProvider } from "./context/GlobalStateContext";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SnackbarProvider maxSnack={8}>
        <GlobalStateProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </GlobalStateProvider>
      </SnackbarProvider>
    </>
  );
};

export default App;
