import React, { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isOpenMenu: boolean;
}

const UI_INIT_STATE: UIState = {
  isOpenMenu: true
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INIT_STATE);

  const toggleMenu = (isToggle: boolean) => {
    dispatch({ type: "UI_TOGGLE_SIDEBAR", payload: isToggle });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        // METHODS
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
