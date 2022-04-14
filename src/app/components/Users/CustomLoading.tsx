import React from "react";
import { LinearProgress } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";
import { useRolesStyle } from "@/assets/Roles";

export default function CustomLoadingOverlay() {
    const classes = useRolesStyle();

    return(
        <GridOverlay>
            <div className={classes.loadingOverlay}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
};
