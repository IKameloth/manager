import { createContext } from "react";

interface ContextProps {
  isOpenMenu: boolean;
  // METHODS
  toggleMenu: (isToggle: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);