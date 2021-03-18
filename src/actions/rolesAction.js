import { GET_USER_DATA, ASSIGN_ROLE, REMOVE_ROLE } from "../types/rolesType";
import { LOADING, ERROR, CLEANER } from "../types/commonType";

export const getUserDataAction = (userID) => async(dispatch) => {
  dispatch({
    type: LOADING
  });

  try {
    const url = `http://localhost:4000/users/${userID}`;

    const response = await fetch(url);
    const data = await response.json();
    const userDataJson = data.data.attributes;

    dispatch({
      type: GET_USER_DATA,
      payload: userDataJson
    })

  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message
    });
  };
};

export const asignRoleAction = (data) => async(dispatch) => {
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
      type: ASSIGN_ROLE,
      payload: data
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    });
  };
};

export const removeRoleAction = (roleObj) => async(dispatch) => {
  dispatch({
    type: LOADING
  });

  const url = `http://localhost:4000/roles/${roleObj._id}`;
  const requestOptions = {
    method: "DELETE"
  };
  
  try {
    fetch(url, requestOptions).then(async response => {
      await response;

      dispatch({
        type: REMOVE_ROLE
      });
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message
    });
  };
};

export const cleanerRolesAction = () => (dispatch) => {
  dispatch({
    type: CLEANER
  });
};
