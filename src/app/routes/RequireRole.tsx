import React, { ReactNode } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { RoleType } from "../types";

interface Props {
  children: ReactNode;
}

const RequireRole = ({ children }: Props) => {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, rolesProfile } = common;
  const location = useLocation();
  // TODO: Review correct validation of role
  let res = false;
  rolesProfile?.map((role) => {
    if (role?.name === "Admin") res = true;
  });
  const paths = ["/roles", "/people", "/institutions"];

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
