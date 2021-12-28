import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CardActions, Grid, IconButton } from "@material-ui/core";

interface Props {
  path: string;
}

export default function BackButton({ path }: Props) {
  return (
    <CardActions
      disableSpacing
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ marginRight: 5 }}>
        <Link to={path}>
          <IconButton
            aria-label="back"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)",
              borderRadius: 25,
            }}
          >
            <ArrowBackIcon style={{ color: "#3366FF" }} />
          </IconButton>
        </Link>
      </div>
    </CardActions>
  );
}
