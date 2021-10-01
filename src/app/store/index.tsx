import { combineReducers } from 'redux'
import { CommonState, commonReducer } from './common'
import { UserState, userReducer } from './user'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['isLoggedIn', 'profile', 'currentCountry', 'currentInstitution']
};

const persistUserConfig = {
  storage,
  key: 'user',
};

const rootReducer = combineReducers({
  common: persistReducer(persistConfig, commonReducer),
  user: persistReducer(persistUserConfig, userReducer)
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
const persistor = persistStore(store);

export {
  store,
  persistor,
}

export type StoreState = {
  common: CommonState
  user: UserState
};
