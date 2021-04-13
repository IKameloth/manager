import React, {Suspense} from "react";
import {withRouter, Switch, Route} from "react-router-dom";

import Navbar from "../components/app/Navigation";
import UserManager from "../components/userManager/UserManagerPage";
import Identities from "../components/identity/IdentitiesPage";
import Institutions from "../components/institution/IntitutionsPage";
import Login from "../components/login/LoginPage";
import Person from "../components/person/PersonPage";
import Sensors from "../components/sensor/SensorsPage";
import Users from "../components/user/UserPage";
import UserNew from "../components/user/UserNew";
import UserDetails from "../components/user/UserDetails";
import RoleDetails from "../components/role/RoleDetailsPage";
import InstitutionNew from "../components/institution/InstitutionNew";
import InstitutionDetails from "../components/institution/InstitutionDetails";
import Alert from "../components/app/common/Alert";
import Register from "../components/register/Register";

const Routes = withRouter(({location}) => {
  return (
    <>
    <Alert />
      <Switch>
        <Suspense fallback={null} >
          {location.pathname !== "/login" 
            && location.pathname !== "/register" 
            && location.pathname !== "/" 
            && <Navbar 
          />}
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={UserManager} />
          <Route exact path="/identities" component={Identities} />
          <Route exact path="/institutions" component={Institutions} />
          <Route exact path="/institution/new" component={InstitutionNew} />
          <Route exact path="/institution/:institutionID/edit" component={InstitutionDetails} />
          <Route exact path="/persons" component={Person} />
          <Route exact path="/sensors" component={Sensors} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/new" component={UserNew} />
          <Route exact path="/users/:userID/details" component={UserDetails} />
          <Route exact path="/users/:userID/roles" component={RoleDetails} />
        </Suspense>
      </Switch>
    </>
  );
});

export default Routes;