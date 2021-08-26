import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/index';

const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Roles = React.lazy(() => import('./pages/roles'));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return(
    <React.Suspense fallback={null}>
      <Switch location={location} key={key}>
        <Route exact path="/login" render={() => <Login />} />
        <Navbar>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/roles" render={() => <Roles />} />
          <Route exact path="/people" render={() => <People />} />
          <Route exact path="/institutions" render={() => <Institutions />} />
        </Navbar>
      </Switch>
    </React.Suspense>
  );
};