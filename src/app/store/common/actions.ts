import { Action } from "redux";
import { CommonTypes as Type } from "./types";

export interface SetIsLoadingAction extends Action<Type.SET_IS_LOADING> {};
export interface UnsetIsLoadingAction extends Action<Type.UNSET_IS_LOADING> {};

export interface SetErrorMessageAction extends Action<Type.SET_ERROR_MESSAGE> {
  payload: string
};

export type CommonActions = SetIsLoadingAction | UnsetIsLoadingAction |SetErrorMessageAction;
