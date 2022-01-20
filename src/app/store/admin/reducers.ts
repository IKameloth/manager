import {
  AdminState as State,
  AdminTypes as Types,
  AdminActions as Actions,
} from ".";

const INITIAL_STATE: State = {
  errorMessage: "",
  unauthorized: false,
};

export const adminReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS_LIST:
      return { ...state, usersList: action.payload };
    case Types.SET_ERROR_MSG_ADM:
      return { ...state, errorMessage: action.payload };
    case Types.GET_ROLES_BY_USER:
      return { ...state, rolesList: action.payload };
    case Types.GET_USER:
      return { ...state, user: action.payload };
    case Types.UPDATE_USER:
      return { ...state, user: action.payload };
    case Types.CLEAN_ADMIN_STATE:
      return {
        ...state,
        usersList: undefined,
        rolesList: undefined,
        user: undefined,
        errorMessage: "",
        unauthorized: false,
      };
    case Types.UNAUTHORIZED:
      return { ...state, unauthorized: action.payload };
    default:
      return state;
  }
};
