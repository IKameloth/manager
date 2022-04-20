import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Chip } from "@mui/material";
import { RoleType } from "@/app/types";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";

export default function RoleNames(props: { rolesArr: [RoleType?] }) {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, currentInstitution } = common;
  if (props.rolesArr?.length > 0) {
    return (
      <>
        {props.rolesArr.map((role) => {
          if (
            role &&
            role.institution.name === currentInstitution &&
            role.institution.country === currentCountry
          )
            return (
              <Chip
                key={role.id}
                size="small"
                color="primary"
                icon={<LocalOfferIcon />}
                label={role.name}
              />
            );
        })}
      </>
    );
  }
  return (
    <Chip
      size="small"
      color="primary"
      icon={<LocalOfferIcon />}
      label="Vacio"
    />
  );
}
