import { Dispatch } from "redux";
import { AdminTypes as Type } from "./types";
import { ApiServicesProvider } from "@/services/apiServices";
import {
  CreateUserAction,
  GetUserAction,
  GetUsersListAction,
  RecoverPasswordAction,
  UpdateUserAction,
  AdminActions,
  ConfirmAccountAction,
  GetAllRolesByUser,
  CleanAdminStateAction,
} from "./actions";
import { AssignRoleAction, RemoveRoleAction } from ".";

const Services = new ApiServicesProvider();

export const getUsersList = (token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<GetUsersListAction> => {
    const resp = await Services.getUsers(token);

    if (resp.error) {
      if (resp.status === 401) {
        dispatch({ type: Type.UNAUTHORIZED, payload: true });
      }
      dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: resp.error });
    }

    return dispatch({ type: Type.GET_USERS_LIST, payload: resp });
  };
};

export const createUser = (
  name: string,
  dni: string,
  email: string,
  token: string
) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<CreateUserAction | {}> => {
    const res = await Services.postUser(name, dni, email, token);

    if (res.error) {
      if (res.status === 401) {
        dispatch({ type: Type.UNAUTHORIZED, payload: true });
      }
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Usuario ya se encuentra registrado",
      });
    }

    return res.data;
  };
};

export const getUser = (dni: string, token: string) => {
  return async (dispatch: Dispatch<AdminActions>): Promise<GetUserAction> => {
    const res = await Services.getUser(dni, token);

    if (res.status === 401) {
      dispatch({ type: Type.UNAUTHORIZED, payload: true });
    }

    if (res.data) {
      return dispatch({ type: Type.GET_USER, payload: res.data });
    } else {
      return dispatch({ type: Type.GET_USER, payload: res });
    }
  };
};

export const recoverPassword = (dni: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<RecoverPasswordAction | {}> => {
    try {
      const res = await Services.recoverPass(dni);
      if (res.error) {
        return dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: res.error });
      }
      return res.data.id;
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Ocurrió un problema, intentelo nuevamente más tarde",
      });
    }
  };
};

export const updateUser = (
  dni: string,
  status: boolean,
  token: string,
  name?: string,
  email?: string,
  password?: string,
) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<UpdateUserAction | {}> => {
    try {
      const res = await Services.updateUser(dni, status, token, name, email, password);
      if (res.error) {
        if (res.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
        return dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: res.error });
      }

      dispatch({ type: Type.UPDATE_USER, payload: res.data });
      return res.data;
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Ocurrió un problema, intentelo de nuevo más tarde",
      });
    }
  };
};

export const banUser = (dni: string, status: boolean, token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<UpdateUserAction | {}> => {
    try {
      const res = await Services.banUser(dni, status, token);

      if (res.error) {
        if (res.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
        return dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: res.error });
      }

      dispatch({ type: Type.UPDATE_USER, payload: res.data });
      return res.data;
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Ocurrió un problema, intentelo de nuevo más tarde",
      });
    }
  };
};

export const validateToken = (token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<AdminActions | {}> => {
    const res = await Services.validateToken(token);
    return res;
  };
};

export const validateTokenConfirm = (token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<AdminActions | {}> => {
    const res = await Services.validateToken(token);
    return res;
  };
};

export const setErrorMsg = (msg: string) => {
  return (dispatch: Dispatch<AdminActions>): AdminActions =>
    dispatch({
      type: Type.SET_ERROR_MSG_ADM,
      payload: msg,
    });
};

export const userConfirm = (password: string, token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<ConfirmAccountAction | {}> => {
    try {
      const res = await Services.confirmUser(password, token);

      if (res.error) {
        if (res.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
        return dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: res.error });
      }

      return res.id;
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Imposible conectar con los servicios de Autentia",
      });
    }
  };
};

export const getAllRolesByUser = (userId: string, token: string) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<GetAllRolesByUser> => {
    const resp = await Services.getRolesByUserId(userId, token);
    if (resp.status === 401) {
      dispatch({ type: Type.UNAUTHORIZED, payload: true });
    }
    return dispatch({ type: Type.GET_ROLES_BY_USER, payload: resp });
  };
};

export const assignRole = (
  dni: string,
  role: string,
  institution: string,
  country: string,
  token: string
) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<AssignRoleAction | {}> => {
    try {
      const res = await Services.assignNewRole(
        dni,
        role,
        institution,
        country,
        token
      );
      if (res.error) {
        if (res.status === 401) {
          dispatch({ type: Type.UNAUTHORIZED, payload: true });
        }
        return dispatch({ type: Type.SET_ERROR_MSG_ADM, payload: res.error });
      }
      return dispatch({ type: Type.GET_USER, payload: res.data });
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Ha ocurrido un error, intentelo nuevamente más tarde",
      });
    }
  };
};

export const removeRole = (
  userId: string,
  name: string,
  institution: string,
  country: string,
  token: string
) => {
  return async (
    dispatch: Dispatch<AdminActions>
  ): Promise<RemoveRoleAction | {}> => {
    try {
      const res = await Services.removeRole(
        userId,
        name,
        institution,
        country,
        token
      );

      if (res.status === 401) {
        dispatch({ type: Type.UNAUTHORIZED, payload: true });
      }

      return res.data;
    } catch (err) {
      return dispatch({
        type: Type.SET_ERROR_MSG_ADM,
        payload: "Imposible conectar con los servicios de Autentia",
      });
    }
  };
};

export const cleanAdminState = () => {
  return (dispatch: Dispatch): CleanAdminStateAction => {
    return dispatch({
      type: Type.CLEAN_ADMIN_STATE,
    });
  };
};
