import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';

const HealthCheck = React.lazy(() => import('./pages/healthCheck'));
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Roles = React.lazy(() => import('./pages/roles'));
const RolesDetail = React.lazy(() => import('./pages/roles/RolesDetail'))
const People = React.lazy(() => import('./pages/people'));
const Institutions = React.lazy(() => import('./pages/institutions'));

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
        <Navbar>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/roles" render={() => <Roles />} />
          <Route exact path="/roles/:dni" render={() => <RolesDetail />} />
          <Route exact path="/people" render={() => <People />} />
          <Route exact path="/institutions" render={() => <Institutions />} />
        </Navbar>
      </Switch>
    </React.Suspense>
  );
};