import { CommonState as State, CommonTypes as Types, CommonActions as Actions } from "./";

const INITIAL_STATE: State = {
  isLoading: false,
  errorMessage: "",
  isLoggedIn: false,
  profile: {
    userData: {
      id: "",
      type: "",
      attributes: {
        name: "",
        country: [],
        email: "",
        rut: ""
      },
      relationships: {
        roles: {},
      },
    },
    userToken: "",
  },
  currentCountry: "",
  currentInstitution: "",
};

export const commonReducer = (state: State = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.SET_IS_LOADING:
      return { ...state, isLoading: true }
    case Types.UNSET_IS_LOADING:
      return { ...state, isLoading: false }
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    case Types.LOGOUT:
      return { ...state, isLoggedIn: false, profile: action.payload, currentCountry: action.payload.currentCountry, currentInstitution: action.payload.currentInstitution }
    case Types.SET_LOGIN:
      return { ...state, isLoggedIn: true, profile: action.payload }
    case Types.SET_CURRENT_COUNTRY:
      return { ...state, currentCountry: action.payload }
    case Types.SET_CURRENT_INSTITUTION:
      return { ...state, currentInstitution: action.payload }  
    default:
      return state;
  };
};
