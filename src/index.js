import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/theme/globalStyles";
import Theme from "./assets/theme/theme";
import App from "./components/app/App";

import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const container = document.getElementById('root');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers, // all reducers
  {}, // init state
  composeEnhancers(applyMiddleware(reduxThunk)) // debug
);

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
  </ThemeProvider>, container
);
