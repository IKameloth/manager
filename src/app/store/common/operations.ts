import { Dispatch } from "redux";
import { CommonTypes as Type } from "./types";
import {
  CommonActions,
  SetCountriesAction,
  SetLoginAction,
  SetRolesAction,
} from "./actions";
import { ApiServicesProvider } from "../../../services/apiServices";
const $Services = new ApiServicesProvider();

export const setIsLoading = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
    dispatch({
      type: Type.SET_IS_LOADING,
    });
};

export const unsetIsLoading = () => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
    dispatch({
      type: Type.UNSET_IS_LOADING,
    });
};

export const setErrorMessage = (errorMessage: string) => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
    dispatch({
      type: Type.SET_ERROR_MESSAGE,
      payload: errorMessage,
    });
};

export const setCountry = (country: string) => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
    dispatch({
      type: Type.SET_COUNTRY_PROFILE,
      payload: country,
    });
};

export const setInstitution = (institution: string) => {
  return (dispatch: Dispatch<CommonActions>): CommonActions =>
    dispatch({
      type: Type.SET_INSTITUTION_PROFILE,
      payload: institution,
    });
};

export const loginRequest = (userDni: string, password: string) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetLoginAction | {}> => {
    try {
      const res = await $Services.sendLoginRequest(password, userDni);

      const result = {
        id: res.user.id,
        CreatedAt: res.user.CreatedAt,
        name: res.user.name,
        email: res.user.email,
        dni: res.user.dni,
        validated: res.user.validated,
        token: res.token,
      };

      if (res.error) {
        return dispatch({
          type: Type.SET_ERROR_MESSAGE,
          payload: res.error,
        });
      }

      if (!res.user.validated)
        return dispatch({
          type: Type.SET_ERROR_MESSAGE,
          payload: "Debe confirmar su cuenta antes de continuar",
        });

      return dispatch({ type: Type.SET_LOGIN, payload: result });
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MESSAGE,
        payload: "Imposible conectar con servicios Autentia",
      });
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch): CommonActions => {
    return dispatch({
      type: Type.LOGOUT,
      payload: {
        id: "",
        CreatedAt: "",
        dni: "",
        name: "",
        email: "",
        validated: false,
        token: "",
        currentCountry: "",
        currentInstitution: "",
      },
      rolesProfile: [],
    });
  };
};

export const setCountries = () => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetCountriesAction | false | {}> => {
    try {
      const resp = await $Services.getCountries();

      if (resp.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: resp.error });
      }

      return dispatch({ type: Type.SET_COUNTRIES, payload: resp });
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MESSAGE,
        payload: "Imposible conectar con servicios Autentia",
      });
    }
  };
};

export const setRoles = (token: string, userID: string, country: string) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetRolesAction | false | {}> => {
    const response = await $Services.getRoles(userID, country);
    if (response.data)
      return dispatch({ type: Type.SET_ROLES_PROFILE, payload: response.data });
    return [];
  };
};

export default {
  setCountry,
  setInstitution,
  setRoles,
  setCountries,
  setIsLoading,
  unsetIsLoading,
  setErrorMessage,
  loginRequest,
  logout,
};
