import React from "react";
import { useRolesStyle } from "@/assets/Roles";
import { Avatar } from "@material-ui/core";

interface userProps {
  name: string;
}

export default function ShowAvatar(props: userProps) {
  const classes = useRolesStyle();

  const nameTag = () => {
    if (props.name.indexOf(" ") > 0) {
      return `${props.name.split(" ")[0][0].toUpperCase()}${props.name
        .split(" ")[1][0]
        .toUpperCase()}`;
    } else {
      return `${props.name[0].toUpperCase()}${props.name[1].toUpperCase()}`;
    }
  };

  return (
    <div className={classes.avatarContent}>
      <Avatar className={classes.avatarName}>{nameTag()}</Avatar>
      <label>{props.name}</label>
    </div>
  );
}
