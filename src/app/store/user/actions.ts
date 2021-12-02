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

export interface GetUser extends Action<Type.GET_USER> {
  payload: UserType
}

export interface CleanUser extends Action<Type.CLEAR_USER> {
  payload: {
    id: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    validated_at: string
    dni: string
    name: string
    email: string
    roles: [RoleType?]
  }
}

export interface RecoverPasswordAction extends Action<Type.RECOVER_PASSWORD> {
  payload: string
}

export interface SetErrorMessageAction extends Action<Type.SET_ERROR_MESSAGE> {
  payload: string
}

export interface SetMessageAction extends Action<Type.SET_MESSAGE> { 
  payload: string 
}

export interface UpdateUserAction extends Action<Type.UPDATE_USER> {
  payload: UserType
}

export interface ResetState extends Action<Type.RESET_STATE> {
  payload: { users: [], country: '', institution: '', roles: [], errorMessage: '', message: '' }
}


export type UserActions = 
  ResetState |
  SetErrorMessageAction |
  RecoverPasswordAction |
  GetUser |
  CreateUser |
  CleanUserList |
  CleanUser |
  GetUsersAction | 
  SetCountryAction | 
  SetInstitutionAction |
  SetRolesAction |
  UpdateUserAction |
  SetMessageAction
