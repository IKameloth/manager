import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/theme/globalStyles";
import Theme from "./assets/theme/theme";

const container = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>, container
);
