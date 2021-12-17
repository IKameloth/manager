import {
  AdminState as State,
  AdminTypes as Types,
  AdminActions as Actions,
} from ".";

const INITIAL_STATE: State = {
  usersList: [],
  errorMessage: "",
  message: "",
};

export const adminReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS_LIST:
      return { ...state, usersList: action.payload };
    case Types.SET_ERROR_MSG_ADM:
      return { ...state, errorMessage: action.payload };
    case Types.SET_MESSAGE_ADM:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
