import { combineReducers } from "redux";

import { UserState, userReducer } from "./user";
import { CommonState, commonReducer } from "./common";

export const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
});

export type StoreState = {
  user: UserState;
  common: CommonState;
};
