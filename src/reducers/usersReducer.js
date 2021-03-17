import { GET_USERS, POST_ROLE_USER } from "../types/usersType";
import { LOADING, ERROR, CLEANER } from "../types/commonType";

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, loading: false, error: null }
    case POST_ROLE_USER:
      return { ...state, loading: false, data: action.payload, error: null }
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, loading: false, error: action.payload }
    case CLEANER:
      return { ...state, users: [], error: null }
    default:
      return state;
  };
};
