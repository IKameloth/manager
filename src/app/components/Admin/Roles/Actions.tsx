import React from "react";
import { useRolesStyle } from "@/assets/Roles";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
}

export default function ActionButtons({ userId }: Props) {
  const classes = useRolesStyle();

  return (
    <>
      <div className={classes.actionContent}>
        <FormControlLabel
          label=""
          control={
            <Link to={`/roles/${userId}`}>
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
