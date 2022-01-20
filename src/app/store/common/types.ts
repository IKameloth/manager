import { InstitutionType } from "@/app/types/InstitutionType";
import { CountriesType, ProfileType, RoleType } from "src/app/types";

export enum CommonTypes {
  SET_IS_LOADING = "SET_IS_LOADING",
  UNSET_IS_LOADING = "UNSET_IS_LOADING",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  LOGOUT = "LOGOUT",
  SET_LOGIN = "SET_LOGIN",
  SET_PROFILE = "SET_PROFILE",
  SET_COUNTRY_PROFILE = "SET_COUNTRY_PROFILE",
  SET_INSTITUTION_PROFILE = "SET_INSTITUTION_PROFILE",
  SET_ROLES_PROFILE = "SET_ROLES_PROFILE",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_INSTITUTIONS_LIST = "SET_INSTITUTIONS_LIST",
  UNAUTHORIZED = "UNAUTHORIZED",
  GET_SENSOR = "GET_SENSOR",
}

export type CommonState = {
  errorMessage: string;
  isLoggedIn: boolean;
  profile: ProfileType;
  currentCountry: string;
  currentInstitution: string;
  rolesProfile?: [RoleType?];
  countries?: CountriesType;
  institutions?: [InstitutionType];
  unauthorized: boolean;
};
