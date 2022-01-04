import { FormControlLabel, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteRole from "./DeleteRole";
import { useDispatch } from "react-redux";
import { getAllRolesByUser, removeRole } from "@/app/store/admin/operations";
import { toast } from "react-hot-toast";

interface Props {
  roleName: string;
  userId: string;
  institution: string;
  country: string;
}

const RemoveRole = ({ userId, roleName, institution, country }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatcher = useDispatch();

  const handleRemove = async () => {
    let res = await dispatcher(
      removeRole(userId, roleName, institution, country)
    );

    if (typeof res === "boolean") {
      dispatcher(getAllRolesByUser(userId));
      toast.success("Rol eliminado con éxito!", {
        position: "top-center",
        duration: 5000,
      });
    } else {
      toast.error("Rol no encontrado ó inválido", {
        position: "top-center",
        duration: 5000,
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
