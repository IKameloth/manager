import React from "react";
import { CircularProgress } from "@material-ui/core";

interface Props {
  isSize?: number | 40;
}

export default function CircularLoader({ isSize }: Props) {
  return <CircularProgress color="secondary" size={isSize} />;
}
