import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";

const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import("./pages/login"));

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
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
    </React.Suspense>
  );
};
