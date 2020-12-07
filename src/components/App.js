import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import "../i18n"

const App = () => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={null}>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/index" component={Dashboard} />
        <Route exact path="/admin" component={Admin} />
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default App;