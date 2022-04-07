import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { store, persistor } from "./app/store";
import App from "./app/App";
import theme from "./assets/theme";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { UIProvider } from "./app/context/ui";

const container = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <UIProvider>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Toaster position="top-center" reverseOrder={true} />
            <App />
          </Router>
        </PersistGate>
      </ThemeProvider>
    </UIProvider>
  </Provider>,
  container
);
