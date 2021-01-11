import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes/Routes";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/theme/globalStyles";
import Theme from "./assets/theme/theme";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>, container
);
