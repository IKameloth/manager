import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { StoreState } from "@/app/store";
import { cleanAdminState } from "../store/admin";
import { logout } from "../store/common";

type ProtectedProps = {
  render: ((props: RouteComponentProps<any>) => React.ReactNode);
  role?: string
  exact: boolean
  path: string
}

export const ProtectedRoute = ({ render, role, ...other }: ProtectedProps) => {
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, profile, unauthorized } = common;

  if (unauthorized || !profile.status) {
    dispatcher(cleanAdminState());
    dispatcher(logout());
    return <Redirect to="/" />;
  }

  if (!currentCountry.length && !currentInstitution.length)
    return <Redirect to="/" />;

  return (
    <Route
      {...other}
      render={(props) => <Route {...props} render={render} />}
    />
  );
};
