import React from "react";
import { CircularProgress } from "@mui/material";

interface Props {
  isSize?: number | 40;
}

export default function CircularLoader({ isSize }: Props) {
  return <CircularProgress color="secondary" size={isSize} />;
}
