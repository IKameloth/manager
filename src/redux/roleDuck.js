// constant

const INITIAL_STATE = {
  loading: false,
  error: null,
  userData: {},
  form: {},
};

// types
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_ROLES = "GET_ROLES";

// reducers
export default function roleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  };
};

// actions

export const getUserDataAction = (params) => async(dispatch, getState) => {
  dispatch({
    type: LOADING,
    payload: { loading: true }
  });

  try {
    const url = `http://localhost:4000/users/${params.userID}`;

    const data = await fetch(url).then(response => response.json());
    console.log(data)
    dispatch({
      type: GET_ROLES,
      payload: { userData: data }
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { error: err }
    })
  };
};