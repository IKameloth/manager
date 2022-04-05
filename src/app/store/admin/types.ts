import { UserType, RoleType } from "@/app/types";

export enum AdminTypes {
  GET_USERS_LIST = "GET_USERS_LIST",
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  GET_USER = "GET_USER",
  RECOVER_PASSWORD = "RECOVER_PASSWORD",
  ASSIGN_ROLE = "ASSIGN_ROLE",
  REMOVE_ROLE = "REMOVE_ROLE",
  SET_ERROR_MSG_ADM = "SET_ERROR_MSG_ADM",
  CONFIRM_USER = "CONFIRM_USER",
  GET_ROLES_BY_USER = "GET_ROLES_BY_USER",
  CLEAN_ADMIN_STATE = "CLEAN_ADMIN_STATE",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export type AdminState = {
  usersList?: [UserType?]
  rolesList?: [RoleType]
  user?: UserType
  errorMessage: string
  unauthorized?: boolean
};
