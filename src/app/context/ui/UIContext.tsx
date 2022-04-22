import { createContext } from "react";

interface ContextProps {
  isOpenMenu: boolean;
  isOpenWorkplace: boolean;
  // METHODS
  toggleMenu: (isToggle: boolean) => void;
  toggleWorkplace: (isToggle: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
