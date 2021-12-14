import { Dispatch } from "redux";
import { UserTypes as Type } from "./types";
import { GetUsersAction, SetRolesAction, UserActions, GetUser, AssignRole } from "./actions";
import { ApiServicesProvider } from "@/services/apiServices";
import { CreateUser, RecoverPasswordAction, UpdateUserAction } from "./actions";
import { RemoveRole } from ".";

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

export const clearUser = () => {
  return (dispatch: Dispatch<UserActions>): UserActions => dispatch({ type: Type.CLEAR_USER, payload: {
    id: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    validated_at: '',
    dni: '',
    name: '',
    email: '',
    roles: []
  } })
}

export const createUser = (name: string, dni: string, email: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<CreateUser | {}> => {
    const res = await $Services.postUser(name, dni, email)
    
    if (res.error) {
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Usuario ya se encuentra registrado" })
    } else {
      dispatch({ type: Type.CLEAN_USER_LIST, payload: [] })
      dispatch({ type: Type.SET_MESSAGE, payload: "Usuario registrado con éxito" })
      return dispatch({ type: Type.CREATE_USER, payload: res })
    }
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
  return async (dispatch: Dispatch<UserActions>): Promise<RecoverPasswordAction | {}> => {
    try {
      const res = await $Services.recoverPass(dni)
      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: res.error });
      };
      dispatch({ type: Type.SET_MESSAGE, payload: "Se ha enviado un email de recuperación" })
      return res
    } catch(err) {
      console.log("Error", err)
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: 'Ocurrió un problema, intentelo nuevamente más tarde' });
    }
  }
}

export const updateUser = (dni: string, name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<UpdateUserAction | {}> => {
    try {
      const res = await $Services.updateUser(dni, name, email, password)

      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: res.error })
      }

      return dispatch({ type: Type.UPDATE_USER, payload: res.data })
    } catch (err) {
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Ocurrió un problema, intentelo de nuevo más tarde" })
    }
  }
}

export const validateToken = (token: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<UserActions | {}> => {
    const res = await $Services.validateToken(token)
    return res
  }
}

export const validateTokenConfirm = (token: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<UserActions | {}> => {
    const res = await $Services.validateToken(token)
    return res
  }
}

export const setMessage = (msg: string) => {
  return(dispatch: Dispatch<UserActions>): UserActions => 
  dispatch({
    type: Type.SET_MESSAGE,
    payload: msg
  })
}

export const cleanMessage = () => {
  return(dispatch: Dispatch<UserActions>): UserActions => 
  dispatch({ 
    type: Type.SET_MESSAGE, 
    payload: ''
  })
}

export const cleanErrorMessage = () => {
  return (dispatch: Dispatch<UserActions>): UserActions =>
  dispatch({
    type: Type.SET_ERROR_MESSAGE,
    payload: ''
  });
};

export const userConfirm = (password: string, token: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<UserActions | undefined | {}> => {
    try {
      const res = await $Services.confirmUser(password, token)

      
      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: res.error })
      }
      
      if (res?.id.length > 0) {
        return res.id
      }
    } catch(err) {
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Ocurrió un problema, intentelo de nuevo más tarde" })
    }
  }
}

export const resetState = () => {
  return (dispatch: Dispatch<UserActions>): UserActions => dispatch({ type: Type.RESET_STATE, payload: {
    users: [], country: '', institution: '', roles: [], errorMessage: '', message: ''
  } })
}

export const assignRole = (dni: string, role: string, institution: string, country: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<AssignRole | {}> => {
    try {
      const res = await $Services.assignNewRole(dni, role, institution, country)
      console.log("Operation: ", res)
      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: res.error })
      }

      dispatch({ type: Type.SET_MESSAGE, payload: "Rol registrado con éxito" })
      return dispatch({ type: Type.GET_USER, payload: res.data })
    } catch (err) {
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Ha ocurrido un error, intentelo nuevamente más tarde" })
    }
  }
}

export const removeRole = (userId: string, role: string, institution: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<RemoveRole | {}> => {
    try {
      const res = await $Services.removeRole(userId, role, institution)

      if (res.error) {
        console.log("Operation ERROR:  ", res)
        return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Rol no existe ó es inválido" })
      }

      dispatch({ type: Type.SET_MESSAGE, payload: "Rol eliminado" })
      return dispatch({ type: Type.GET_USER, payload: res.data })
    } catch(err) {
      return dispatch({ type: Type.SET_ERROR_MESSAGE, payload: "Imposible conectar con los servicios de Autentia" })
    }
  }
}