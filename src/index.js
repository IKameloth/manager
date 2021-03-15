import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/theme/globalStyles";
import Theme from "./assets/theme/theme";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";

const container = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>, container
);
