import React, {Suspense} from "react";
import {withRouter, Switch, Route} from "react-router-dom";
import "../i18n";

import Navbar from "../components/Navigation";
import AdminRoles from "../pages/AdminRoles";
import Identities from "../pages/Identities";
import Institutions from "../pages/Intitutions";
import Login from "../pages/Login";
import Person from "../pages/Person";
import Sensors from "../pages/Sensors";
import Users from "../pages/Users";
import InstitutionNew from "../components/InstitutionNew";

const Routes = withRouter(({location}) => {
  return (
    <Switch>
      <Suspense fallback={null} >
        {location.pathname !== "/login" && location.pathname !== "/" && <Navbar />}
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={AdminRoles} />
        <Route exact path="/identities" component={Identities} />
        <Route exact path="/institutions" component={Institutions} />
        <Route exact path="/institution/new" component={InstitutionNew} />
        <Route exact path="/persons" component={Person} />
        <Route exact path="/sensors" component={Sensors} />
        <Route exact path="/users" component={Users} />
      </Suspense>
    </Switch>
  )
});

export default Routes;