import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import "../i18n"

const App = () => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={null}>
        <Route exact path="/" component={Login} />
        <Route exact path="/index" component={Dashboard} />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default App;