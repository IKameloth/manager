import { RoleType } from "@/app/types";

export enum UserTypes {
  GET_USERS = "GET_USERS",
  SET_COUNTRY = "SET_COUNTRY",
  SET_INSTITUTION = "SET_INSTITUTION",
  SET_ROLES = "SET_ROLES",
};

export type UserState = {
  users: object[]
  country: string
  institution: string
  roles: [RoleType?]
};
