import { GET_USERS, POST_ROLE_USER } from "../types/usersType";
import { LOADING, ERROR, CLEANER } from "../types/commonType";

export const getUsersAction = () => async(dispatch: any) => {
  dispatch({
    type: LOADING
  });

  try {
    const url = "http://localhost:4000/users";
    const response = await fetch(url);
    const data = await response.json();
    const dataResult:any = [];
    data.data.map((attr: any) => dataResult.push(attr.attributes));

    dispatch({
      type: GET_USERS,
      payload: dataResult
    });

  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message
    });
  }
};

export const registerRoleAction = (data: any) => async(dispatch: any) => {
  dispatch({
    type: LOADING
  });

  const url = `http://localhost:4000/roles`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    dispatch({
      type: POST_ROLE_USER,
      payload: data
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    });
  };
};

export const cleanerUsersAction = () => (dispatch: any) => {
  dispatch({
    type: CLEANER
  });
};