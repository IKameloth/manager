import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import "../i18n"
import LanguajeSelector from "../components/LanguageSelector"
import "../assets/style/design/index.scss";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={null}>
        <LanguajeSelector/>
        <Route exact path="/" component={Login} />
        <Route exact path="/index" component={Dashboard} />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default App;