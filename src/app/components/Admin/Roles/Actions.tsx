import React from "react";
import { useRolesStyle } from "@/assets/Roles";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

interface Props {
  dni: any;
}

export default function ActionButtons(props: Props) {
  const classes = useRolesStyle();

  return (
    <>
      <div className={classes.actionContent}>
        <FormControlLabel
          label=""
          control={
            <Link to={`/roles/${props.dni}`}>
              <IconButton color="secondary" aria-label="editar">
                <EditIcon style={{ color: "#3366FF" }} />
              </IconButton>
            </Link>
          }
        />
      </div>
    </>
  );
}
