import { combineReducers } from "redux";
import { CommonState, commonReducer } from "./common";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminReducer, AdminState } from "./admin";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import environment from "@/config/environment";

const commonConfig = {
  transforms: [
    encryptTransform({
      secretKey: `${environment.BASE_KEY}`,
      onError: function (error) {
        console.log("ERROR",error)
      },
    }),
  ],
}

const persistConfig = {
  storage,
  key: "root",
  whitelist: [
    "isLoggedIn",
    "profile",
    "currentCountry",
    "currentInstitution",
    "rolesProfile",
  ],
  ...commonConfig
};

const persistUserConf = {
  storage,
  key: "admin",
  ...commonConfig
};

const rootReducer = combineReducers({
  common: persistReducer(persistConfig, commonReducer),
  admin: persistReducer(persistUserConf, adminReducer),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
const persistor = persistStore(store);
export { store, persistor };

export type StoreState = {
  common: CommonState;
  admin: AdminState;
};
