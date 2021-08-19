import { Action } from "redux";
import { UserTypes as Type } from "./types";

export interface GetUsersAction extends Action<Type.GET_USERS> {
  payload: object[];
};
export interface SetCountryAction extends Action<Type.SET_COUNTRY> {
  payload: string;
};
export interface SetInstitutionAction extends Action<Type.SET_INSTITUTION> {
  payload: string;
};

export type UserActions = 
    GetUsersAction | 
    SetCountryAction | 
    SetInstitutionAction
