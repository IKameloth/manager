import { RoleType, UserType } from "@/app/types";
import { Action } from "redux";
import { UserTypes as Type } from "./types";

export interface GetUsersAction extends Action<Type.GET_USERS> {
  payload: [UserType];
};

export interface SetCountryAction extends Action<Type.SET_COUNTRY> {
  payload: string;
};

export interface SetInstitutionAction extends Action<Type.SET_INSTITUTION> {
  payload: string;
};

export interface SetRolesAction extends Action<Type.SET_ROLES> {
  payload: [RoleType];
};

export type UserActions = 
  GetUsersAction | 
  SetCountryAction | 
  SetInstitutionAction |
  SetRolesAction
