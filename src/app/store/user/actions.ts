import { Action } from "redux";
import { UserTypes as Type } from "./types";

export interface GetUsersAction extends Action<Type.GET_USERS> {
  payload: object[];
};

export interface GetUsersAction extends Action<Type.GET_USERS> {
  payload: object[];
};

export type UserActions = 
  GetUsersAction