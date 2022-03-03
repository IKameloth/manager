import { Dispatch } from "redux";
import { CommonTypes as Type } from "./types";
import {
  CommonActions,
  SetCountriesAction,
  SetLoginAction,
  SetRolesAction,
} from "./actions";
import { ApiServicesProvider, UsersServicesProvider } from "@/services"
import { SetInstitutionsListAction, SetUserListAction } from "."
const $Services = new ApiServicesProvider();
const $Users = new UsersServicesProvider();

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

      if (res.error) {
        return dispatch({
          type: Type.SET_ERROR_MESSAGE,
          payload: res.error,
        });
      } else {
        const result = {
          id: res.user.id,
          CreatedAt: res.user.CreatedAt,
          name: res.user.name,
          email: res.user.email,
          dni: res.user.dni,
          validated: res.user.validated,
          status: res.user.status,
          token: res.token,
        };

        return dispatch({ type: Type.SET_LOGIN, payload: result });
      }
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
        status: true,
        currentCountry: "",
        currentInstitution: "",
        rolesProfile: [],
      },
    });
  };
};

export const setCountries = (token: string) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetCountriesAction | false | {}> => {
    try {
      const resp = await $Services.getCountries(token);

      if (resp.error) {
        if (resp.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
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

// GET LIST INSTITUTIONS
export const setInstitList = (country: string, token: string) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetInstitutionsListAction | {}> => {
    try {
      const resp = await $Services.getInstitutions(country, token);

      if (resp.error) {
        if (resp.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: resp });
      }

      return dispatch({ type: Type.SET_INSTITUTIONS_LIST, payload: resp.data });
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MESSAGE,
        payload: "Imposible conectar con servicios de Autentia",
      });
    }
  };
};

export const setUsersList = (token: string, country: string, institution: string, offset?: number) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetUserListAction> => {
    const resp = await $Users.getUsersList(token, country, institution, offset);
    console.log("RES", resp)
    if (resp.error) {
      if (resp.status === 401) {
        dispatch({ type: Type.UNAUTHORIZED, payload: true });
      }
      dispatch({ type: Type.SET_ERROR_MESSAGE, payload: resp.error });
      return dispatch({ type: Type.SET_USERS_LIST, payload: {data: []} });
    }
    console.log("SEND USER LIST", resp)
    return dispatch({ type: Type.SET_USERS_LIST, payload: resp });
  };
};

export const setRoles = (userID: string, country: string, token: string) => {
  return async (
    dispatch: Dispatch<CommonActions>
  ): Promise<SetRolesAction | false | {}> => {
    const response = await $Services.getRoles(userID, country, token);
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
  setErrorMessage,
  loginRequest,
  logout,
};
