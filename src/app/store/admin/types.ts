import { UserType } from "@/app/types/UserType";

export enum AdminTypes {
  GET_USERS_LIST = "GET_USERS_LIST",
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  GET_USER = "GET_USER",
  RECOVER_PASSWORD = "RECOVER_PASSWORD",
  ASSIGN_ROLE = "ASSIGN_ROLE",
  REMOVE_ROLE = "REMOVE_ROLE",
  SET_ERROR_MSG_ADM = "SET_ERROR_MSG_ADM",
  SET_MESSAGE_ADM = "SET_MESSAGE_ADM",
}

export type AdminState = {
  usersList: [UserType?];
  errorMessage: string;
  message: string;
};
