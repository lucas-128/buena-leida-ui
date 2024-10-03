import React, { createContext, useContext, useState, ReactNode } from "react";
//import axios from "axios";

interface User {
  mail: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (mail: string, pass: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  const login = async (mail: string, _password: string) => {
    let email = mail;

    // try {
    //   const result = await axios.post(
    //     ``,
    //     {
    //       email,
    //       password,
    //     }
    //   );

    //   setIsAuthenticated(true);
    //   setUser({ mail: email });

    //   return result;
    // } catch (e) {
    //   return { error: true, message: (e as any).response.data.message };
    // }

    setIsAuthenticated(true);
    setUser({ mail: email });
  };

  const logout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
