import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import alertsReducer from "./alertsReducer";
import rolesReducer from "./rolesReducer";
import auth from "./auth";

export default combineReducers({
  usersReducer,
  rolesReducer,
  alertsReducer,
  auth,
});