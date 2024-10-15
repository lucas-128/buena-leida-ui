import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import GlobalStyle from "./GlobalStyles";
import { GlobalStateProvider } from "./context/GlobalStateContext";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalStateProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GlobalStateProvider>
    </>
  );
};

export default App;
