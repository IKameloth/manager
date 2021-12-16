import { Action } from "redux";
import { CommonTypes as Type } from "./types";
import { ProfileType } from "@/app/types/ProfileType";
import { CountriesType, RoleType } from "@/app/types";

export interface SetIsLoadingAction extends Action<Type.SET_IS_LOADING> { }

export interface UnsetIsLoadingAction extends Action<Type.UNSET_IS_LOADING> { }

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

export interface SetRolesAction extends Action<Type.SET_ROLES> {
  payload: RoleType;
}

export interface SetCountryAction extends Action<Type.SET_COUNTRY> {
  payload: string;
}

export interface SetInstitutionAction extends Action<Type.SET_INSTITUTION> {
  payload: string;
}

export type CommonActions =
  | SetInstitutionAction
  | SetCountryAction
  | SetRolesAction
  | SetCountriesAction
  | SetIsLoadingAction
  | UnsetIsLoadingAction
  | SetErrorMessageAction
  | SetLoginAction
  | LogoutAction;
