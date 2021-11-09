import { RoleType } from "@/app/types";
import { UserType } from "@/app/types/UserType";

export enum UserTypes {
  GET_USERS = "GET_USERS",
  CLEAN_USER_LIST = "CLEAN_USER_LIST",
  SET_COUNTRY = "SET_COUNTRY",
  SET_INSTITUTION = "SET_INSTITUTION",
  SET_ROLES = "SET_ROLES",
  CREATE_USER = "CREATE_USER",
};

export type UserState = {
  users: [UserType?]
  country: string
  institution: string
  roles: [RoleType?]
};
