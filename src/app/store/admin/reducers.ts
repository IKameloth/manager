import {
  AdminState as State,
  AdminTypes as Types,
  AdminActions as Actions,
} from ".";

const INITIAL_STATE: State = {
  errorMessage: "",
};

export const adminReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS_LIST:
      return { ...state, usersList: action.payload };
    case Types.SET_ERROR_MSG_ADM:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
