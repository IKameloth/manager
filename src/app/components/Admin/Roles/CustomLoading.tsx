import React from "react";
import { LinearProgress } from "@material-ui/core";
import { GridOverlay } from "@material-ui/data-grid";
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
