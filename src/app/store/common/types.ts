import { CountriesType, ProfileType, RoleType } from "src/app/types";

export enum CommonTypes {
  SET_IS_LOADING = "SET_IS_LOADING",
  UNSET_IS_LOADING = "UNSET_IS_LOADING",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  LOGOUT = "LOGOUT",
  SET_LOGIN = "SET_LOGIN",
  SET_PROFILE = "SET_PROFILE",
  SET_COUNTRY = "SET_COUNTRY",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_ROLES = "SET_ROLES",
  SET_INSTITUTION = "SET_INSTITUTION",
};

export type CommonState = {
  isLoading: boolean
  errorMessage: string
  isLoggedIn: boolean
  profile: ProfileType
  rolesProfile: [RoleType?]
  countries?: CountriesType
};
