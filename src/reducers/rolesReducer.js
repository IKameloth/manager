import { GET_USER_DATA, ASSIGN_ROLE, REMOVE_ROLE } from "../types/rolesType";
import { LOADING, ERROR, CLEANER } from "../types/commonType";

const INITIAL_STATE = {
  loading: false,
  error: null,
  reload: false,
  userData: [],
};

export default function rolesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, userData: action.payload, loading: false, reload: false }
    case ASSIGN_ROLE:
      return { ...state, userData: [], loading: false, reload: true }
    case REMOVE_ROLE:
      return { ...state, userData: [], loading: false, reload: true }
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, error: action.payload, reload: false }
    case CLEANER:
      return { ...state, userData: [], loading: false, reload: true }
    default:
      return state;
  };
};