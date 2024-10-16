import React, { createContext, useContext, useState, ReactNode } from "react";
import { useGlobalState } from "./GlobalStateContext";
//import axios from "axios";

interface User {
  mail: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
  login: (mail: string, pass: string) => Promise<any>;
  logout: () => void;
  register: (
    mail: string,
    name: string,
    username: string,
    pass: string,
    genres: string[]
  ) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const { dispatch } = useGlobalState();

  const login = async (mail: string, _password: string) => {
    let email = mail;

    // Tiene que devolver con el success, el Nombre del usuario para actualizar el estado global
    // y tambien tiene que devolver los generos favoritos.

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
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_NAME", payload: "" });
    dispatch({ type: "SET_FAVORITE_GENRES", payload: [] });
    setIsAuthenticated(false);
  };

  const register = async (
    mail: string,
    name: string,
    username: string,
    _password: string,
    genres: string[]
  ) => {
    console.log(name);
    dispatch({ type: "SET_EMAIL", payload: mail });
    dispatch({ type: "SET_NAME", payload: name });
    dispatch({ type: "SET_USERNAME", payload: username });
    dispatch({ type: "SET_FAVORITE_GENRES", payload: genres });
    setUser({ mail: mail });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        login,
        logout,
        register,
      }}
    >
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
