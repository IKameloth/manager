import { Dispatch } from "redux";
import { CommonTypes as Type } from "./types";
import { CommonActions } from "./actions";
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

export const loginRequest = (userDni: string, country: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: Type.SET_IS_LOADING });

    try {
      const response = await $Services.sendLoginRequest(password, userDni, country);
      console.log('LOGIN OPERATION: ', response);

    } catch (err) {
      console.log('LOGIN ERROR: ', err);
      // CUANDO ENTRA EL CATCH, ESTE ME REFRESCA LA PANTALLA Y NO MUESTRA EL ERROR
      // CREO QUE ENTENDI MAL EL FILE ENVIRONMENT Y ESTE ME LO ESTA REDIRECCIONANDO
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: err.message });
    };

    return dispatch({ type: Type.UNSET_IS_LOADING });
  }
};

export const logout = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions => dispatch({ type: Type.LOGOUT });
};

export default {
  setIsLoading,
  unsetIsLoading,
  setErrorMessage,
  cleanErrorMessage,
  loginRequest,
  logout,
};