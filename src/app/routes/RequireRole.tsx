import React, { ReactNode } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { RoleType } from "../types";

interface Props {
  children: ReactNode;
}

const RequireRole = ({children}: Props) => {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, rolesProfile } = common;
  const location = useLocation();

  const res = rolesProfile?.map((role) => role?.name === "Admin")[0];
  const paths = ["/roles", "/people", "/institutions", "/sensor"];

  if (!currentCountry.length && !currentInstitution.length)
    return <Redirect to="/" />;

  return res ? (
    <>{children}</>
  ) : (
    <Redirect
      to={paths.includes(location.pathname) ? "/" : location.pathname}
    />
  );
};

export default RequireRole;
