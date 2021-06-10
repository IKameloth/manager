import { CommonState as State, CommonTypes as Types, CommonActions as Actions } from "./";
import AuthService from "../../../config/authServices";

const authServices = new AuthService();
const isLoogedIn = authServices.isAuthenticated();
const profile = authServices.getUserInfo();

const INITIAL_STATE: State = {
  isLoading: false,
  errorMessage: "",
  isLoggedIn: isLoogedIn,
  profile: profile,
  list_institutions: []
};

export const commonReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.SET_IS_LOADING:
      return { ...state, isLoading: true }
    case Types.UNSET_IS_LOADING:
      return { ...state, isLoading: false }
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    case Types.LIST_INSTIT:
      return { ...state, list_institutions: action.payload }
    case Types.LOGOUT:
      return { ...state, isLoggedIn: false, profile: {}, list_institutions: {} }
    default:
      return state;
  };
};
