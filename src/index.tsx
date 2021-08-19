import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from '@material-ui/core/styles';
import { store, persistor } from "./app/store";
import App from "./app/App";
import { ToastProvider } from 'react-toast-notifications';
import theme from "./assets/theme";
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Router>
      </PersistGate>
    </Provider>
  </ThemeProvider>, container
);
