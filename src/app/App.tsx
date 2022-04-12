import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import RequireRole from "./routes/RequireRole";
import { SearchSensor } from '@/app/pages/sensor';


const HealthCheck = React.lazy(() => import("./pages/healthCheck"));
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Roles = React.lazy(() => import("./pages/roles"));
const RolesDetail = React.lazy(() => import("./pages/roles/RolesDetail"));
const People = React.lazy(() => import("./pages/people"));
const Institutions = React.lazy(() => import("./pages/institutions"));
const Enrollment = React.lazy(() => import("./pages/enrollment/Enrollment"));
const ReEnrollment = React.lazy(() => import("./pages/enrollment/ReEnrollment"));
const TokenValidation = React.lazy(
  () => import("./pages/recover/tokenValidation")
);
const ValidateAccountToken = React.lazy(
  () => import("./pages/confirm/confirmToken")
);
const RecoverPass = React.lazy(() => import("./pages/recover/recoverPass"));
const NotFound = React.lazy(() => import("./pages/notFound/index"));
const RolesList = React.lazy(() => import("./pages/users/RolesList"));
const RolesSearch = React.lazy(() => import("./pages/users/Search"));

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

        <Navbar>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/home" render={() => <Home />} />

          <ProtectedRoute exact path="/sensor" render={() => <SearchSensor />} />
          <ProtectedRoute exact path="/users/search" render={() => <RolesSearch />} />
          <ProtectedRoute exact path="/users/roles/:operation?" render={() => <RolesList />} />
          <ProtectedRoute exact path="/enrollment" render={() => <Enrollment />} />
          <ProtectedRoute exact path="/reenrollment" render={() => <ReEnrollment />} />
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
        </Navbar>
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </React.Suspense>
  );
}
