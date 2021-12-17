import { UserType } from "@/app/types";
import { Action } from "redux";
import { AdminTypes as Type } from "./types";

export interface GetUsersListAction extends Action<Type.GET_USERS_LIST> {
  payload: [UserType];
}

export interface CreateUserAction extends Action<Type.CREATE_USER> {
  payload: UserType;
}

export interface GetUserAction extends Action<Type.GET_USER> {
  payload: UserType;
}

export interface RecoverPasswordAction extends Action<Type.RECOVER_PASSWORD> {
  payload: string;
}

export interface UpdateUserAction extends Action<Type.UPDATE_USER> {
  payload: UserType;
}

export interface AssignRoleAction extends Action<Type.ASSIGN_ROLE> {
  payload: {
    dni: string;
    role: string;
    institution: string;
    country: string;
  };
}

export interface RemoveRoleAction extends Action<Type.REMOVE_ROLE> {
  payload: {
    userId: string;
    role: string;
    institution: string;
  };
}

export interface SetErrorMsgUser extends Action<Type.SET_ERROR_MSG_ADM> {
  payload: string;
}

export interface SetMessageUser extends Action<Type.SET_MESSAGE_ADM> {
  payload: string;
}

export type AdminActions =
  | CreateUserAction
  | SetMessageUser
  | SetErrorMsgUser
  | GetUsersListAction
  | RemoveRoleAction
  | AssignRoleAction
  | RecoverPasswordAction
  | GetUserAction
  | UpdateUserAction;
