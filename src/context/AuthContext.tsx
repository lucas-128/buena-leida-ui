import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useGlobalState } from "./GlobalStateContext";
import axios from "axios";

import Cookies from "js-cookie";


const API_URL = "https://buena-leida-back-kamk.onrender.com";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (mail: string, pass: string) => Promise<any>;
  checkExistance: (email: string, username: string) => Promise<any>;
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") === "true"
  );

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      dispatch({ type: "SET_ID", payload: user.id });
      dispatch({ type: "SET_NAME", payload: user.name });
      dispatch({ type: "SET_USERNAME", payload: user.username });
      dispatch({ type: "SET_EMAIL", payload: user.email });
      dispatch({ type: "SET_PROFILE_PHOTO", payload: user.profilePhoto });
      dispatch({ type: "SET_BIO", payload: user.bio });
      dispatch({ type: "SET_FAVORITE_GENRES", payload: user.favouritegenders });
    }
  }, []);

  const { dispatch } = useGlobalState();

  const login = async (
    email: string,
    password: string
  ): Promise<number | string | void> => {
    try {
      const result = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      setIsAuthenticated(true);
      Cookies.set("isAuthenticated", "true", { expires: 7 }); // Expires in 7 days

      const user = result.data.user;

      dispatch({ type: "SET_ID", payload: user.id });
      dispatch({ type: "SET_NAME", payload: user.name });
      dispatch({ type: "SET_USERNAME", payload: user.username });
      dispatch({ type: "SET_EMAIL", payload: user.email });
      dispatch({ type: "SET_PROFILE_PHOTO", payload: user.profilePhoto });
      dispatch({ type: "SET_BIO", payload: user.bio });
      dispatch({ type: "SET_FAVORITE_GENRES", payload: user.favouritegenders });

      Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Same expiration

      return result.status;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        return e.response.status;
      } else {
        alert(e);
      }
    }
  };

  const checkExistance = async (
    email: string,
    username: string
  ): Promise<number | string | void> => {
    try {
      const result = await axios.post(`${API_URL}/users/check-user-exists`, {
        email,
        username,
      });
      return result.status;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        return e.response.status;
      } else {
        //alert(e);
      }
    }
  };

  const logout = () => {
    dispatch({ type: "SET_EMAIL", payload: "" });
    dispatch({ type: "SET_NAME", payload: "" });
    dispatch({ type: "SET_FAVORITE_GENRES", payload: [] });
    setIsAuthenticated(false);
    Cookies.remove("isAuthenticated");
    Cookies.remove("user");
  };

  const register = async (
    email: string,
    name: string,
    username: string,
    password: string,
    favouritegenders: string[]
  ) => {
    try {
      const result = await axios.post(`${API_URL}/users`, {
        name,
        email,
        password,
        username,
        favouritegenders,
      });

      const user = result.data;

      //console.log(user);

      dispatch({ type: "SET_ID", payload: user.id });
      dispatch({ type: "SET_NAME", payload: user.name });
      dispatch({ type: "SET_USERNAME", payload: user.username });
      dispatch({ type: "SET_EMAIL", payload: user.email });
      dispatch({ type: "SET_PROFILE_PHOTO", payload: user.fotoPerfil });
      dispatch({ type: "SET_BIO", payload: user.biografia });
      dispatch({ type: "SET_FAVORITE_GENRES", payload: user.favouritegenders });

      await setIsAuthenticated(true);
      Cookies.set("isAuthenticated", "true", { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      return result.status;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        return e.response.status;
      } else {
        //alert(e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        register,
        checkExistance,
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
