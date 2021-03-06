import { FormControlLabel, IconButton } from "@mui/material";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteRole from "./DeleteRole";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { setUsersList, removeAutentiaRole, searchUser } from "@/app/store/common";
import Alerts from "../Alerts";

interface Props {
  roleName: string;
  userDNI: string;
}

const RemoveRole = ({
  userDNI,
  roleName
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatcher = useDispatch();

  const { common } = useSelector((state: StoreState) => state)
  const { autentiaUser, profile, currentCountry, currentInstitution } = common
  const handleRemove = async () => {
    await dispatcher(
      removeAutentiaRole(userDNI, roleName, currentInstitution, currentCountry, common.profile.token)
    );

    await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution))
    if(autentiaUser){
      await dispatcher(searchUser(profile.token, currentCountry, currentInstitution, autentiaUser.dni));
    }
    Alerts({
      message: "Rol eliminado con éxito!",
      timer: 5000,
      icon: "success",
    });
    setIsOpen(false);
  };

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FormControlLabel
        label=""
        control={
          <IconButton
            color="secondary"
            aria-label="editar"
            onClick={handleDialog}
          >
            <HighlightOffIcon style={{ color: "#FF0000" }} />
          </IconButton>
        }
      />
      {isOpen && (
        <DeleteRole
          handleClose={handleDialog}
          onSubmit={handleRemove}
          isOpen={isOpen}
          role={roleName}
        />
      )}
    </>
  );
};

export default RemoveRole;
