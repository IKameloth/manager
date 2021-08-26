import { Dispatch } from "redux";
import { UserTypes as Type } from "./types";
import { UserActions } from "./actions";

export const getUsers = (users: object[]) => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
  dispatch({
    type: Type.GET_USERS,
    payload: users
  });
};
