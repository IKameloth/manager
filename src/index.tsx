import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./app/store";
import App from "./app/App";
import GlobalStyle from './assets/theme/global';
import { ToastProvider } from 'react-toast-notifications';

const container = document.getElementById('root');
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>
  </Provider>, container
);
