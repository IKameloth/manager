import { Action } from "redux";
import { CommonTypes as Type } from "./types";
import { CountriesType, ProfileType, RoleType, InstitutionType, UsersListType, SensorType } from "@/app/types"

export interface SetLoginAction extends Action<Type.SET_LOGIN> {
  payload: ProfileType;
}

export interface LogoutAction extends Action<Type.LOGOUT> {
  payload: ProfileType;
}

export interface SetErrorMessageAction extends Action<Type.SET_ERROR_MESSAGE> {
  payload: string;
}

export interface SetCountriesAction extends Action<Type.SET_COUNTRIES> {
  payload: CountriesType;
}

export interface SetRolesAction extends Action<Type.SET_ROLES_PROFILE> {
  payload: [RoleType];
}

export interface SetCountryAction extends Action<Type.SET_COUNTRY_PROFILE> {
  payload: string;
}

export interface SetInstitutionAction
  extends Action<Type.SET_INSTITUTION_PROFILE> {
  payload: string;
}

export interface SetInstitutionsListAction
  extends Action<Type.SET_INSTITUTIONS_LIST> {
  payload: [InstitutionType];
}

export interface UnauthorizedAction extends Action<Type.UNAUTHORIZED> {
  payload: boolean;
}

export interface SetUserListAction extends Action<Type.SET_USERS_LIST> {
  payload: UsersListType;
}

export interface GetSensorAction extends Action<Type.GET_SENSOR> {
  payload: SensorType
}

export interface CreateSensorAction extends Action<Type.CREATE_SENSOR> {
  payload: SensorType
}

export type CommonActions =
  | UnauthorizedAction
  | SetInstitutionsListAction
  | SetInstitutionAction
  | SetCountryAction
  | SetRolesAction
  | SetCountriesAction
  | SetErrorMessageAction
  | SetLoginAction
  | SetUserListAction
  | LogoutAction
  | LogoutAction
  | GetSensorAction
  | CreateSensorAction;
