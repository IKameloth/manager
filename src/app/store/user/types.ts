export enum UserTypes {
  GET_USERS = "GET_USERS",
  SET_COUNTRY = "SET_COUNTRY",
  SET_INSTITUTION = "SET_INSTITUTION"
};

export type UserState = {
  users: object[]
  country: string
  institution: string
};
