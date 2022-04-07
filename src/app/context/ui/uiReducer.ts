import { UIState } from "./";

type UIActionType =
  | {
      type: "UI_TOGGLE_SIDEBAR";
      payload: boolean;
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI_TOGGLE_SIDEBAR":
      return {
        ...state,
        isOpenMenu: action.payload
      }
    default:
      return state;
  }
};
