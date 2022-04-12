import {
  CommonState as State,
  CommonTypes as Types,
  CommonActions as Actions,
} from "./";

const INITIAL_STATE: State = {
  errorMessage: "",
  isLoggedIn: false,
  profile: {
    id: "",
    CreatedAt: "",
    dni: "",
    name: "",
    email: "",
    validated: false,
    status: true,
    token: "",
  },
  currentInstitution: "",
  currentCountry: "",
  unauthorized: false,
  usersList: {
    data: []
  }
};

export const commonReducer = (
  state: State = INITIAL_STATE,
  action: Actions
) => {
  switch (action.type) {
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case Types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        profile: action.payload,
        currentInstitution: "",
        currentCountry: "",
        rolesProfile: undefined,
        unauthorized: false,
        errorMessage: "",
      };
    case Types.SET_LOGIN:
      return { ...state, isLoggedIn: true, profile: action.payload };
    case Types.SET_INSTITUTION_PROFILE:
      return { ...state, currentInstitution: action.payload };
    case Types.SET_COUNTRY_PROFILE:
      return { ...state, currentCountry: action.payload };
    case Types.SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case Types.SET_ROLES_PROFILE:
      return { ...state, rolesProfile: action.payload };
    case Types.SET_INSTITUTIONS_LIST:
      return { ...state, institutions: action.payload };
    case Types.SET_USERS_LIST:
      return { ...state, usersList: action.payload };
    case Types.SEARCH_AUTENTIA_USER:
      return { ...state, autentiaUser: action.payload };
    case Types.UNAUTHORIZED:
      return { ...state, unauthorized: action.payload };
    default:
      return state;
  }
};
