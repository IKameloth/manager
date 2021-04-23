export enum CommonTypes {
  SET_IS_LOADING = "SET_IS_LOADING",
  UNSET_IS_LOADING = "UNSET_IS_LOADING",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  IS_LOGGED_IN = "IS_LOGGED_IN",
  LOGOUT = "LOGOUT",
  SET_PROFILE_DATA = "SET_PROFILE_DATA",
};

export type CommonState = {
  isLoading: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
  profile: object;
};
