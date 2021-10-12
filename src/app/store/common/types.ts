import { ProfileType } from "src/app/types";

export enum CommonTypes {
  SET_IS_LOADING = "SET_IS_LOADING",
  UNSET_IS_LOADING = "UNSET_IS_LOADING",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  IS_LOGGED_IN = "IS_LOGGED_IN",
  LOGOUT = "LOGOUT",
  SET_LOGIN = "SET_LOGIN",
  SET_CURRENT_COUNTRY = "SET_CURRENT_COUNTRY",
  SET_CURRENT_INSTITUTION = "SET_CURRENT_INSTITUTION",
};

export type CommonState = {
  isLoading: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
  profile: {
    userData?: ProfileType,
    userToken: string,
  };
  currentCountry: string;
  currentInstitution: string;
};
