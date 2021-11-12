import { 
  UserState as State, 
  UserTypes as Types, 
  UserActions as Actions 
} from "./";

const INITIAL_STATE: State = {
  users: [],
  country: '',
  institution: '',
  roles: []
};

export const userReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_USERS:
      return { ...state, users: action.payload }
    case Types.SET_COUNTRY:
      return { ...state, country: action.payload }
    case Types.SET_INSTITUTION:
      return { ...state, institution: action.payload }
    case Types.SET_ROLES:
      return { ...state, roles: action.payload }
    case Types.CLEAN_USER_LIST:
      return { ...state, users: action.payload }
    case Types.GET_USER:
      return { ...state, user: action.payload }
    default:
      return state;
  };
};
