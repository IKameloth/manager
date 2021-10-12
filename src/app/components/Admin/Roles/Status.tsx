import { Chip } from "@material-ui/core";
import React from "react";
import { useRolesStyle } from "@/assets/Roles";

interface StatusProps {
    status: boolean;
}

export default function ShowStatus(props: StatusProps) {
    const classes = useRolesStyle();

    return(
        <div>
            { props.status ?
                <Chip label="Activo" className={classes.statusActive} /> :
                <Chip label="Inactivo" className={classes.statusInactive} />
            }
        </div>
    );
};