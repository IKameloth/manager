import { UIState } from "./";

type UIActionType =
  | {
      type: "UI_TOGGLE_SIDEBAR";
      payload: boolean;
    }
  | {
      type: "UI_TOGGLE_WORKSPACE";
      payload: boolean;
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI_TOGGLE_SIDEBAR":
      return {
        ...state,
        isOpenMenu: action.payload,
      };
    case "UI_TOGGLE_WORKSPACE":
      return {
        ...state,
        isOpenWorkplace: action.payload,
      };
    default:
      return state;
  }
};
