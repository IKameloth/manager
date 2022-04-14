import { Chip } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const StatusStyled = makeStyles(() => ({
  unbanned: {
    color: "#209E25",
    backgroundColor: "#C2FFCC",
  },
  banned: {
    color: "#FFA31A",
    backgroundColor: "#FFF6E8",
  },
}));

interface Props {
  status: boolean;
}

export default function ShowValidate({ status }: Props) {
  const classes = StatusStyled();

  return (
    <div>
      {status ? (
        <Chip label={"Habilitado"} className={classes.unbanned} />
      ) : (
        <Chip label="Inhabilitado" className={classes.banned} />
      )}
    </div>
  );
}
