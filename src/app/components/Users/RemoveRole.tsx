import { FormControlLabel, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteRole from "./DeleteRole";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { StoreState } from "@/app/store";
import { setUsersList, removeAutentiaRole } from "@/app/store/common";

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
  const { profile, currentCountry, currentInstitution } = common
  const handleRemove = async () => {
    await dispatcher(
      removeAutentiaRole(userDNI, roleName, currentInstitution, currentCountry, common.profile.token)
    );
    
    // TODO: Add component for messages
    await dispatcher(setUsersList(profile.token, currentCountry, currentInstitution))
    toast.success("Rol eliminado con éxito!", {
      position: "top-center",
      duration: 5000,
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
