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

export const setCountry = (country: string) => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
    dispatch({
      type: Type.SET_COUNTRY,
      payload: country
    });
};

export const setInstitution = (institution: string) => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
    dispatch({
      type: Type.SET_INSTITUTION,
      payload: institution
    });
};
