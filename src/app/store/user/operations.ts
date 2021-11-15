import { Dispatch } from "redux";
import { UserTypes as Type } from "./types";
import { GetUsersAction, SetRolesAction, UserActions, GetUser } from "./actions";
import { ApiServicesProvider } from "@/services/apiServices";
import { CreateUser, RecoverPassword } from ".";
const $Services = new ApiServicesProvider();

export const setCountry = (country: string) => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
    dispatch({
      type: Type.SET_COUNTRY,
      payload: country
    });
};

export const setInstitution = (institution: string) => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
    dispatch({
      type: Type.SET_INSTITUTION,
      payload: institution
    });
};

export const setRoles = (token: string, userID: string, country: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<SetRolesAction | false | {}> => {
    const response = await $Services.getRoles(token, userID, country);
    if(response.data)
      return dispatch({ type: Type.SET_ROLES, payload: response.data })
    return []
  }
};

export const getUsersList = () => {
  return async (dispatch: Dispatch<UserActions>): Promise<GetUsersAction | {}> => {
    const response = await $Services.getUsers();
    if (response.length > 0) { 
      return dispatch({ type: Type.GET_USERS, payload: response }) 
    } else {
      return []
    }
  }
}

export const cleanUserList = () => {
  return(dispatch: Dispatch<UserActions>): UserActions =>
    dispatch({
      type: Type.CLEAN_USER_LIST,
      payload: []
    })
}

export const createUser = (name: string, dni: string, email: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<CreateUser> => {
    const res = await $Services.postUser(name, dni, email)
    
    dispatch({ type: Type.CLEAN_USER_LIST, payload: [] })
    return dispatch({ type: Type.CREATE_USER, payload: res })
  }
}

export const getUser = (dni: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<GetUser> => {
    const res = await $Services.getUser(dni)

    if (res === null) {
      return dispatch({ type: Type.GET_USER, payload: res })
    } else {
      return dispatch({ type: Type.GET_USER, payload: res.data })
    }
  }
}

export const recoverPassword = (dni: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<RecoverPassword | {}> => {
    try {
      const res = await $Services.recoverPass(dni)
      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: res.error });
      };
      return dispatch({ type: Type.RECOVER_PASSWORD, payload: "Se ha enviado un email de recuperación" })
    } catch(err) {
      console.log("Error", err)
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: 'Ocurrió un problema, intentelo nuevamente más tarde' });
    }
  }
}

export const cleanMessage = () => {
  return(dispatch: Dispatch<UserActions>): UserActions => dispatch({ type: Type.RECOVER_PASSWORD, payload: "" });
}