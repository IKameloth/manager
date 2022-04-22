import React, { ReactNode, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isOpenMenu: boolean;
  isOpenWorkplace: boolean;
}

const UI_INIT_STATE: UIState = {
  isOpenMenu: false,
  isOpenWorkplace: false,
};

type Props = {
  children: ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INIT_STATE);

  const toggleMenu = (isToggle: boolean) => {
    dispatch({ type: "UI_TOGGLE_SIDEBAR", payload: isToggle });
  };

  const toggleWorkplace = (isToggle: boolean) => {
    dispatch({ type: "UI_TOGGLE_WORKSPACE", payload: isToggle });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        // METHODS
        toggleMenu,
        toggleWorkplace,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
