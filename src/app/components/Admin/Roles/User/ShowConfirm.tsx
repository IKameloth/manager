import { Chip } from "@mui/material";
import React from "react";

interface Props {
  confirm: string;
}

export default function ShowValidate({ confirm }: Props) {
  return (
    <div>
      {confirm ? (
        <Chip label={"Verificado"} color="success" />
      ) : (
        <Chip label="No verificado" />
      )}
    </div>
  );
}
