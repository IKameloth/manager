import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

interface Props {
  children: any;
}

const RequireRole = (props: Props) => {
  const content = props.children;
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution, rolesProfile } = common;
  const location = useLocation();

  const res = rolesProfile?.map((role) => role?.name === "Admin")[0];
  const paths = ["/roles", "/people", "/institutions"];

  if (!currentCountry.length && !currentInstitution.length)
    return <Redirect to="/" />;

  return res ? (
    <>{content}</>
  ) : (
    <Redirect
      to={paths.includes(location.pathname) ? "/" : location.pathname}
    />
  );
};

export default RequireRole;
