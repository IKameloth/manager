import { Dispatch } from "redux";
import { UserTypes as Type } from "./types";
import { GetUsersAction, SetRolesAction, UserActions } from "./actions";
import { ApiServicesProvider } from "@/services/apiServices";
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
