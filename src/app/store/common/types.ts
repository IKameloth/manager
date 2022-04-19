import { InstitutionType } from "@/app/types/InstitutionType";
import { AutentiaUserType, CountriesType, ProfileType, RoleType, UsersListType } from "src/app/types";

export enum CommonTypes {
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  LOGOUT = "LOGOUT",
  SET_LOGIN = "SET_LOGIN",
  SET_PROFILE = "SET_PROFILE",
  SET_COUNTRY_PROFILE = "SET_COUNTRY_PROFILE",
  SET_INSTITUTION_PROFILE = "SET_INSTITUTION_PROFILE",
  SET_ROLES_PROFILE = "SET_ROLES_PROFILE",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_INSTITUTIONS_LIST = "SET_INSTITUTIONS_LIST",
  SET_USERS_LIST = "SET_USERS_LIST",
  UNAUTHORIZED = "UNAUTHORIZED",
  GET_SENSOR = "GET_SENSOR",
  CREATE_SENSOR = "CREATE_SENSOR",
  REMOVE_AUTENTIA_ROLE = "REMOVE_AUTENTIA_ROLE",
  ADD_AUTENTIA_ROLE = "ADD_AUTENTIA_ROLE",
  SEARCH_AUTENTIA_USER = "SEARCH_AUTENTIA_USER",
}

export type CommonState = {
  errorMessage: string
  isLoggedIn: boolean
  profile: ProfileType
  currentCountry: string
  currentInstitution: string
  rolesProfile?: [RoleType?]
  countries?: CountriesType
  institutions?: [InstitutionType]
  unauthorized: boolean
  usersList: UsersListType
  autentiaUser?: AutentiaUserType
};
