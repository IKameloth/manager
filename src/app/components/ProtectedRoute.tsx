import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { StoreState } from "../store";

export const ProtectedRoute = ({ render, ...other }: any) => {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution } = common;

  return (
    <Route
      {...other}
      render={(props) =>
        !!currentCountry.length && !!currentInstitution.length ? (
          <Route {...props} render={render} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
