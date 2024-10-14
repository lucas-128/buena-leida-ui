import React, { createContext, useContext, useReducer, ReactNode } from "react";

type GlobalState = {
  user: string | null;
  // TODO
};

type Action = { type: "SET_USER"; payload: string };

const initialState: GlobalState = {
  user: null,
};

// Reducer function to manage state updates
const globalStateReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
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

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
