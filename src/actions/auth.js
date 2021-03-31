import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types/commonType";
import { SET_ALERT } from "../types/alertsType";
import { setAlert } from "./alertAction";
import AuthService from "../services/authService";

export const register = (rut, email, name, country, password) => (dispatch) => {
  return AuthService.register(rut, email, name, country, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS
      });

      dispatch({
        type: SET_ALERT,
        payload: response.data.message
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: SET_ALERT,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const login = (rut, password, country) => (dispatch) => {
  return AuthService.login(rut, password, country).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data }
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
      if (message === "Failed to fetch") {
        dispatch(setAlert("Error al conectar con Autentia", "danger"));
      };

      if (error.status === 401) {
        dispatch(setAlert("Debes iniciar sesión o registrarte antes de continuar.", "warning"));
      };

      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject(message);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};
