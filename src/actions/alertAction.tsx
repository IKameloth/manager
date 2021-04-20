import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "../types/alertsType";

export const setAlert = (message: string, alertType: string, timeout = 5000) => (dispatch: any) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id }
  });

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }), timeout);
};

export const removeAlert = (id: string) => (dispatch: any) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id
  });
};
