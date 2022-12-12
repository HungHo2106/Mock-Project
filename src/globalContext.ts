import { createContext } from "react";

const contextValue: any = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const GlobalContext = createContext(contextValue);
