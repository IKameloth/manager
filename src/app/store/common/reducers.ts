import { CommonState as State, CommonTypes as Types, CommonActions as Actions } from "./";

const INITIAL_STATE: State = {
  isLoading: false,
  errorMessage: "",
};

export const commonReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.SET_IS_LOADING:
      return { ...state, isLoading: true }
    case Types.UNSET_IS_LOADING:
      return { ...state, isLoading: false }
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    default:
      return state;
  };
};
