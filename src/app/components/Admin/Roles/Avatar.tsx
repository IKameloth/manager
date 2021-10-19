import React from "react";
import { useRolesStyle } from "@/assets/Roles";
import { Avatar } from "@material-ui/core";

interface userProps {
    name: string;
};

export default function ShowAvatar(props: userProps) {
    const classes = useRolesStyle();

    return(
        <div className={classes.avatarContent}>
            <Avatar className={classes.avatarName}>
                {`${props.name.split(' ')[0][0].toUpperCase()}${props.name.split(' ')[1][0].toUpperCase()}`}
            </Avatar>
            <label>{props.name}</label>
        </div>
    );
};
