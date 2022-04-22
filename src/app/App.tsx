import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import RequireRole from "./routes/RequireRole";
import { AppLayout } from "./components/layouts";

const HealthCheck = React.lazy(() => import("./pages/healthCheck"));
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Roles = React.lazy(() => import("./pages/roles"));
const RolesDetail = React.lazy(() => import("./pages/roles/rolesDetail"));
const People = React.lazy(() => import("./pages/people"));
const Institutions = React.lazy(() => import("./pages/institutions"));
const Enrollment = React.lazy(() => import("./pages/enrollment/enrollment"));
const ReEnrollment = React.lazy(
  () => import("./pages/enrollment/reEnrollment")
);
const TokenValidation = React.lazy(
  () => import("./pages/recover/tokenValidation")
);
const ValidateAccountToken = React.lazy(
  () => import("./pages/confirm/confirmToken")
);
const RecoverPass = React.lazy(() => import("./pages/recover/recoverPass"));
const NotFound = React.lazy(() => import("./pages/notFound/index"));
const RolesList = React.lazy(() => import("./pages/users/rolesList"));
const Verification = React.lazy(() => import("./pages/identity/verification"));
const NewDni = React.lazy(() => import("./pages/identity/newDni"));
const OldDni = React.lazy(() => import("./pages/identity/oldDni"));
const DbDni = React.lazy(() => import("./pages/identity/dbDni"));
const SearchSensor = React.lazy(() => import("./pages/sensor/searchSensor"));
const RegisterSensor = React.lazy(
  () => import("./pages/sensor/registerSensor")
);

const RolesSearch = React.lazy(() => import("./pages/users/search"));

export default function App() {
  const location = useLocation();
  const [key, setKey] = useState(Math.random());
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (pathname !== location.pathname) {
      setKey(Math.random());
    }
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <React.Suspense fallback={null}>
      <Switch location={location} key={key}>
        {/* Gral Route */}
        <Route path="/healthz" render={() => <HealthCheck />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/recover" render={() => <RecoverPass />} />
        <Route
          exact
          path="/validate/account/:token"
          render={() => <ValidateAccountToken />}
        />
        <Route
          exact
          path="/recovery/:token"
          render={() => <TokenValidation />}
        />

        <AppLayout>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/home" render={() => <Home />} />

          <ProtectedRoute
            exact
            path="/sensor"
            render={() => <SearchSensor />}
          />
          <ProtectedRoute
            exact
            path="/sensor/register"
            render={() => <RegisterSensor />}
          />
          <ProtectedRoute
            exact
            path="/users/search"
            render={() => <RolesSearch />}
          />
          <ProtectedRoute
            exact
            path="/users/roles/:operation?"
            render={() => <RolesList />}
          />
          <ProtectedRoute
            exact
            path="/enrollment"
            render={() => <Enrollment />}
          />
          <ProtectedRoute
            exact
            path="/reenrollment"
            render={() => <ReEnrollment />}
          />
          <ProtectedRoute
            exact
            path="/identity/verification"
            render={() => <Verification />}
          />
          <ProtectedRoute
            exact
            path="/identity/newdni"
            render={() => <NewDni />}
          />
          <ProtectedRoute
            exact
            path="/identity/olddni"
            render={() => <OldDni />}
          />
          <ProtectedRoute
            exact
            path="/identity/dbdni"
            render={() => <DbDni />}
          />
          {/* AdminRoute */}
          <RequireRole>
            <ProtectedRoute exact path="/roles" render={() => <Roles />} />
            <ProtectedRoute
              exact
              path="/roles/:userId"
              render={() => <RolesDetail />}
            />
            <ProtectedRoute exact path="/people" render={() => <People />} />
            <ProtectedRoute
              exact
              path="/institutions"
              render={() => <Institutions />}
            />
          </RequireRole>
        </AppLayout>
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </React.Suspense>
  );
}
