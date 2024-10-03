import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import GlobalStyle from './GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle /> 
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
};

export default App;