import { CommonState as State, CommonTypes as Types, CommonActions as Actions } from "./";

const INITIAL_STATE: State = {
  isLoading: false,
  errorMessage: "",
  isLoggedIn: false,
  profile: {},
};

export const commonReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.SET_IS_LOADING:
      return { ...state, isLoading: true }
    case Types.UNSET_IS_LOADING:
      return { ...state, isLoading: false }
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    case Types.LOGOUT:
      return { ...state, isLoggedIn: false, profile: {} }
    case Types.SET_PROFILE_DATA:
      return { ...state, profile: action.payload, isLoggedIn: true }
    default:
      return state;
  };
};
