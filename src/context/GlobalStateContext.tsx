import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { defaultPhotoUrl } from "../pages/Profile";

type GlobalState = {
  id: number;
  name: string;
  username: string;
  email: string;
  profilePhoto: string;
  bio: string;
  favoriteGenres: string[];
};

type Action =
  | { type: "SET_ID"; payload: number }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PROFILE_PHOTO"; payload: string }
  | { type: "SET_BIO"; payload: string }
  | { type: "SET_FAVORITE_GENRES"; payload: string[] };

const initialState: GlobalState = {
  id: -1,
  name: "",
  username: "test",
  email: "",
  profilePhoto: defaultPhotoUrl,
  bio: "",
  favoriteGenres: [],
};

const globalStateReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PROFILE_PHOTO":
      return { ...state, profilePhoto: action.payload };
    case "SET_BIO":
      return { ...state, bio: action.payload };
    case "SET_FAVORITE_GENRES":
      return { ...state, favoriteGenres: action.payload };
    default:
      return state;
  }
};

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
