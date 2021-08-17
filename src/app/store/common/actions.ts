import { Action } from "redux";
import { CommonTypes as Type } from "./types";

export interface SetIsLoadingAction extends Action<Type.SET_IS_LOADING> {};

export interface UnsetIsLoadingAction extends Action<Type.UNSET_IS_LOADING> {};

export interface SetLoginAction extends Action<Type.SET_LOGIN> {
  payload: {
    userData: any,
    userToken: string,
  };
};

export interface Logout extends Action<Type.LOGOUT>{
  payload: {
    userData: any,
    userToken: string,
  };
};

export interface SetErrorMessageAction extends Action<Type.SET_ERROR_MESSAGE> {
  payload: string
};

export type CommonActions = 
  SetIsLoadingAction | 
  UnsetIsLoadingAction |
  SetErrorMessageAction | 
  SetLoginAction |
  Logout;
