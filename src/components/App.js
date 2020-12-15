import React, {Suspense} from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import "../i18n";

import Login from "../pages/Login";
import Navbar from "../components/Navigation";
import Users from "../pages/Users";
import Admin from "../pages/Admin";
import Institutions from "../pages/Intitutions";
import Person from "../pages/Person";
import Identities from "../pages/Identities";
import Sensors from "../pages/Sensors";

const App = withRouter(({ location }) => {
  return(
    <Switch>
      <Suspense fallback={null}>
        {location.pathname !== "/login" && location.pathname !== "/"  && <Navbar />}
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/institutions" component={Institutions} />
        <Route exact path="/persons" component={Person} />
        <Route exact path="/identities" component={Identities} />
        <Route exact path="/sensors" component={Sensors} />
        <Route exact path="/admin" component={Admin} />
      </Suspense>
    </Switch>
  );
});


export default App;