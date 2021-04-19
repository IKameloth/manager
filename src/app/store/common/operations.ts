import { Dispatch } from "redux";
import { CommonTypes as Type } from "./types";
import { CommonActions } from "./actions";

export const setIsLoading = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions => 
  dispatch({
    type: Type.SET_IS_LOADING
  });
};

export const unsetIsLoading = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
  dispatch({
    type: Type.UNSET_IS_LOADING
  });
};

export const setErrorMessage = (errorMessage: string) => {
  return (dispatch: Dispatch<CommonActions>): CommonActions => 
  dispatch({ 
    type: Type.SET_ERROR_MESSAGE, 
    payload: errorMessage
  });
};
