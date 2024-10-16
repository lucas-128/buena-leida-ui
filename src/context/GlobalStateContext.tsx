import React, { createContext, useContext, useReducer, ReactNode } from "react";

type GlobalState = {
  name: string | null;
  username: string | null;
  email: string | null;
  favoriteGenres: string[];
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_FAVORITE_GENRES"; payload: string[] };

const initialState: GlobalState = {
  name: "",
  username: "username",
  email: "",
  favoriteGenres: [],
};

// Reducer function to manage state updates
const globalStateReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
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
