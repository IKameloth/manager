import { RoleType, UserType } from "@/app/types";
import { Action } from "redux";
import { AdminTypes as Type } from "./types";

export interface GetUsersListAction extends Action<Type.GET_USERS_LIST> {
  payload: [UserType?];
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

export interface SetErrorMsg extends Action<Type.SET_ERROR_MSG_ADM> {
  payload: string;
}

export interface ConfirmAccountAction extends Action<Type.CONFIRM_USER> {
  payload: string;
}

export interface GetAllRolesByUser extends Action<Type.GET_ROLES_BY_USER> {
  payload: [RoleType];
}

export interface CleanAdminStateAction extends Action<Type.CLEAN_ADMIN_STATE> {}

export interface UnauthorizedAction extends Action<Type.UNAUTHORIZED> {
  payload: boolean;
}

export type AdminActions =
  | UnauthorizedAction
  | CleanAdminStateAction
  | GetAllRolesByUser
  | ConfirmAccountAction
  | CreateUserAction
  | SetErrorMsg
  | GetUsersListAction
  | RemoveRoleAction
  | AssignRoleAction
  | RecoverPasswordAction
  | GetUserAction
  | UpdateUserAction;
