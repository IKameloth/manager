import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import alertsReducer from "./alertsReducer";
import rolesReducer from "./rolesReducer";

export default combineReducers({
  usersReducer,
  rolesReducer,
  alertsReducer
});