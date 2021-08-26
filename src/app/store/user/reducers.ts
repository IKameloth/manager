import { UserState as State, UserTypes as Types, UserActions as Actions } from "./";

const INITIAL_STATE: State = {
  users: []
};

export const userReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS:
      return { ...state, users: action.payload }
    default:
      return state;
  };
};
