import { Dispatch } from "redux";
import { CommonTypes as Type } from "./types";
import { CommonActions, SetLoginAction } from "./actions";
import { ApiServicesProvider } from "../../../services/apiServices";

const $Services = new ApiServicesProvider();

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

export const cleanErrorMessage = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
  dispatch({
    type: Type.SET_ERROR_MESSAGE,
    payload: ''
  });
};

export const loginRequest = (userDni: string, password: string) => {
  return async (dispatch: Dispatch<CommonActions>): Promise<SetLoginAction | false | {}> => {
    try {
      const response = await $Services.sendLoginRequest(password, userDni);

      if (response.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: response.error });
      };
      
      return dispatch({ type: Type.SET_LOGIN, payload: response });
    }catch(err) {
      console.log("Error", err)
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: 'Ocurrió un error, intentelo nuevamente más tarde' });
    };
  }
}

export const logout = () => {
  return (dispatch: Dispatch): CommonActions => {
    return dispatch({ type: Type.LOGOUT, payload: { userData: {}, userToken: '' } });
  };
};

export default {
  setIsLoading,
  unsetIsLoading,
  setErrorMessage,
  cleanErrorMessage,
  loginRequest,
  logout,
};