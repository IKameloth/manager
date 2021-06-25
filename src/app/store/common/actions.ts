import { Action } from "redux";
import { CommonTypes as Type } from "./types";

export interface SetIsLoadingAction extends Action<Type.SET_IS_LOADING> {};
export interface UnsetIsLoadingAction extends Action<Type.UNSET_IS_LOADING> {};
export interface Logout extends Action<Type.LOGOUT>{};
export interface ListInstitutions extends Action<Type.LIST_INSTIT>{
  payload: any
};
export interface SetErrorMessageAction extends Action<Type.SET_ERROR_MESSAGE> {
  payload: string
};
export interface CurrentInstitution extends Action<Type.CURRENT_INSTIT> {
  payload: any
};

export type CommonActions = 
  SetIsLoadingAction | 
  UnsetIsLoadingAction |
  SetErrorMessageAction | 
  Logout | 
  ListInstitutions |
  CurrentInstitution;
