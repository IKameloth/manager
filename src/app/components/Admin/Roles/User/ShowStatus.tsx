import { Chip } from "@mui/material";
import React from "react";

interface Props {
  status: boolean;
}

export default function ShowValidate({ status }: Props) {  
  return (
    <div>
      {status ? (
        <Chip label={"Habilitado"} color="success" />
      ) : (
        <Chip label="Inhabilitado" />
      )}
    </div>
  );
}
