import { RoleType } from "@/app/types";
import { UserType } from "@/app/types/UserType";

export enum UserTypes {
  GET_USERS = "GET_USERS",
  CLEAN_USER_LIST = "CLEAN_USER_LIST",
  SET_COUNTRY = "SET_COUNTRY",
  SET_INSTITUTION = "SET_INSTITUTION",
  SET_ROLES = "SET_ROLES",
  CREATE_USER = "CREATE_USER",
  GET_USER = "GET_USER",
  CLEAR_USER = "CLEAR_USER",
  RECOVER_PASSWORD = "RECOVER_PASSWORD",
  SET_MESSAGE = "SET_MESSAGE",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  UPDATE_USER = "UPDATE_USER",
};

export type UserState = {
  user?: UserType
  users: [UserType?]
  country: string
  institution: string
  roles: [RoleType?]
  message: string
  errorMessage: string
};
