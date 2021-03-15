// constant
const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
};

// types
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_USERS = "GET_USERS";
const POST_ROLE_USER = "POST_ROLE_USER";

// reducers
export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      }
    case POST_ROLE_USER:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};

// actions
export const getUsersAction = () => async(dispatch, getState) => {
  dispatch({
    type: LOADING,
    payload: {
      loading: true
    }
  });

  try {
    const url = "http://localhost:4000/users";

    const response = await fetch(url).then(response => response.json());
    const dataResult = [];
    response.data.map((attr) => dataResult.push(attr.attributes));

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

export const registerRoleAction = (params) => async(dispatch, getState) => {
  dispatch({
    type: LOADING,
    payload: { loading: true }
  });

  try {
    console.log(JSON.stringify(params))
    const urlRequest = `http://localhost:4000/roles/${params.rut}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };

    fetch(urlRequest, requestOptions)
      .then(async response => {
        const data = await response.json();

        console.log(data);
        
        if(data.errors) {
          const error = (data && data.errors) || response.detail;
          return Promise.reject(error);
        };

        dispatch({
          type: POST_ROLE_USER,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          payload: "Not valid data"
        })
      });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message
    })
  };
};
