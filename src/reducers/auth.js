import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types/commonType";

const user = JSON.parse(localStorage.getItem("user"));

const INITIAL_STATE = user 
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, isLoggedIn: false };
    case REGISTER_FAIL:
      return { ...state, isLoggedIn: false };
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.payload.user }
    case LOGIN_FAIL:
      return { ...state, isLoggedIn: false, user: null }
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null }
    default:
      return state;
  };
};
