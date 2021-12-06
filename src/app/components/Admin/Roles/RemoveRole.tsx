import { FormControlLabel, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteRole from "./DeleteRole";

interface Props {
  user: any;
}

const RemoveRole = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = () => {
    console.log("remove", user);
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
            onClick={handleRemove}
          >
            <HighlightOffIcon style={{ color: "#FF0000" }} />
          </IconButton>
        }
      />
      {isOpen && (
        <DeleteRole
          handleClose={handleRemove}
          isOpen={isOpen}
          role={user.role}
        />
      )}
    </>
  );
};

export default RemoveRole;
