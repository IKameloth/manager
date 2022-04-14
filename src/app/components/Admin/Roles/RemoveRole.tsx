import { FormControlLabel, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteRole from "./DeleteRole";
import { useDispatch } from "react-redux";
import { getAllRolesByUser, removeRole } from "@/app/store/admin/operations";
import Alerts from '@/app/components/Alerts';

interface Props {
  roleName: string;
  userId: string;
  institution: string;
  country: string;
  token: string;
}

const RemoveRole = ({
  userId,
  roleName,
  institution,
  country,
  token,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatcher = useDispatch();

  const handleRemove = async () => {
    let res = await dispatcher(
      removeRole(userId, roleName, institution, country, token)
    );

    if (typeof res === "boolean") {
      dispatcher(getAllRolesByUser(userId, token));
      Alerts({
        message: "Rol eliminado con éxito!",
        timer: 5000,
        icon: "success",
      });
    } else {
      Alerts({
        message: "Rol no encontrado ó inválido",
        timer: 5000,
        icon: "error",
      });
    }
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
