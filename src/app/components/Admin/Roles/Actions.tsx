import React from "react";
import { useRolesStyle } from "@/assets/Roles";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

interface userProps {
    user: any
};

export default function ActionButtons(props: userProps) {
    const { dni, name, status } = props.user;
    const classes = useRolesStyle();

    const handleEditClick = () => {
        console.log(dni);
    };

    const handleStatusClick = () => {
        console.log({
            name: name,
            dni: dni,
            status: status
        });
    };

    return(
        <div className={classes.actionContent}>
            <FormControlLabel
              label=""
              control={
                <IconButton
                  color="secondary"
                  aria-label="editar"
                  onClick={handleEditClick}
                >
                  <EditIcon style={{ color: '#3366FF' }} />
                </IconButton>
              }
            />
            { status ?
                <FormControlLabel
                label=""
                control={
                    <IconButton
                    color="secondary"
                    aria-label="deshabilitar"
                    onClick={handleStatusClick}
                    >
                    <NotInterestedIcon style={{ color: '#FF0000' }} />
                    </IconButton>
                }
                /> :
                <FormControlLabel
                label=""
                control={
                    <IconButton
                    color="secondary"
                    aria-label="habilitar"
                    onClick={handleStatusClick}
                    >
                    <CheckCircleOutlineIcon style={{ color: '#209E25' }} />
                    </IconButton>
                }
                />
            }
        </div>
    );
};