import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";

const HealthCheck = React.lazy(() => import('./pages/healthCheck'));
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Roles = React.lazy(() => import('./pages/roles'));
const RolesDetail = React.lazy(() => import('./pages/roles/RolesDetail'))
const People = React.lazy(() => import('./pages/people'));
const Institutions = React.lazy(() => import('./pages/institutions'));
const Recover = React.lazy(() => import('./pages/recover/recoverPass'))
const SetPassView = React.lazy(() => import ('./pages/recover/setPass'))

const ValidateAccount = () => (
  <h1>Validate account</h1>
)

export default function App() {
  const location = useLocation();
  const [ key, setKey ] = useState(Math.random())
  const [ pathname, setPathname ] = useState('')

  useEffect(() => {
    if(pathname !== location.pathname) {
      setKey(Math.random());
    };
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return(
    <React.Suspense fallback={null}>
      <Switch location={location} key={key}>
        <Route path="/healthz" render={() => <HealthCheck />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/recover" render={() => <Recover />} />
        <Route exact path="/validate-account?token=:token" render={() => <ValidateAccount />} />
        <Route exact path="/recovery?token=:token" render={() => <SetPassView />} />
        <Navbar>
          <Route exact path="/" render={() => <Home />} />
          <ProtectedRoute exact path="/roles" render={() => <Roles />} />
          <ProtectedRoute exact path="/roles/:dni" render={() => <RolesDetail />} />
          <ProtectedRoute exact path="/people" render={() => <People />} />
          <ProtectedRoute exact path="/institutions" render={() => <Institutions />} />
        </Navbar>
      </Switch>
    </React.Suspense>
  );
};