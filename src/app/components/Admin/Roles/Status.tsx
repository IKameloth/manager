import { Chip } from "@material-ui/core";
import React from "react";
import { useRolesStyle } from "@/assets/Roles";

interface Props {
  validate: string;
}

export default function ShowValidate(props: Props) {
  const classes = useRolesStyle();

  return (
    <div>
      {props.validate ? (
        <Chip label={"Validado"} className={classes.statusActive} />
      ) : (
        <Chip label="No validado" className={classes.statusInactive} />
      )}
    </div>
  );
}
