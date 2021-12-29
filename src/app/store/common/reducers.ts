import {
  CommonState as State,
  CommonTypes as Types,
  CommonActions as Actions,
} from "./";

const INITIAL_STATE: State = {
  isLoading: false,
  errorMessage: "",
  isLoggedIn: false,
  profile: {
    id: "",
    CreatedAt: "",
    dni: "",
    name: "",
    email: "",
    validated: false,
    token: "",
  },
  currentInstitution: "",
  currentCountry: "",
};

export const commonReducer = (
  state: State = INITIAL_STATE,
  action: Actions
) => {
  switch (action.type) {
    case Types.SET_IS_LOADING:
      return { ...state, isLoading: true };
    case Types.UNSET_IS_LOADING:
      return { ...state, isLoading: false };
    case Types.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case Types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        profile: action.payload,
        currentInstitution: "",
        currentCountry: "",
        rolesProfile: undefined
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
    default:
      return state;
  }
};
