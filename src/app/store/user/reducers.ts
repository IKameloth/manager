import { 
  UserState as State, 
  UserTypes as Types, 
  UserActions as Actions 
} from "./";

const INITIAL_STATE: State = {
  users: [],
  country: '',
  institution: ''
};

export const userReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS:
      return { ...state, users: action.payload }
    case Types.SET_COUNTRY:
      return { ...state, country: action.payload }
    case Types.SET_INSTITUTION:
      return { ...state, institution: action.payload }
    default:
      return state;
  };
};
