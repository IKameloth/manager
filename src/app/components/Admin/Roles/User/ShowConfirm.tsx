import { Chip } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";

const ConfirmStyled = makeStyles(() => ({
  active: {
    color: "#209E25",
    backgroundColor: "#C2FFCC",
  },
  inactive: {
    color: "#FFA31A",
    backgroundColor: "#FFF6E8",
  },
}));

interface Props {
  confirm: string;
}

export default function ShowValidate({ confirm }: Props) {
  const classes = ConfirmStyled();

  return (
    <div>
      {confirm ? (
        <Chip label={"Verificado"} className={classes.active} />
      ) : (
        <Chip label="No verificado" className={classes.inactive} />
      )}
    </div>
  );
}