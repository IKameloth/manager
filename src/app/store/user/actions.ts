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

export interface CleanUserList extends Action<Type.CLEAN_USER_LIST> {
  payload: []
}

export interface CreateUser extends Action<Type.CREATE_USER> {
  payload: UserType
}

export type UserActions = 
  CreateUser |
  CleanUserList |
  GetUsersAction | 
  SetCountryAction | 
  SetInstitutionAction |
  SetRolesAction
