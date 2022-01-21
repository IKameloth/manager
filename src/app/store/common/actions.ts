import { Action } from "redux";
import { CommonTypes as Type } from "./types";
import { ProfileType } from "@/app/types/ProfileType";
import { CountriesType, RoleType } from "@/app/types";
import { InstitutionType } from "@/app/types/InstitutionType";

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

export type CommonActions =
  | UnauthorizedAction
  | SetInstitutionsListAction
  | SetInstitutionAction
  | SetCountryAction
  | SetRolesAction
  | SetCountriesAction
  | SetErrorMessageAction
  | SetLoginAction
  | LogoutAction;
