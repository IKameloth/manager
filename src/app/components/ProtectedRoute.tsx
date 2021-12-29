import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { StoreState } from "../store";

export const ProtectedRoute = ({ render, ...other }: any) => {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, rolesProfile } = common;

  if (rolesProfile?.length) {
    const res = rolesProfile.map((ele) => ele?.name);
    if (!res.includes("Admin")) {
      return <Redirect to="/" />;
    }
  }

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
