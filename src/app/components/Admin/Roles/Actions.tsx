import React, {useState} from "react";
import { useRolesStyle } from "@/assets/Roles";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ShowDialog from "./RoleDialog";
import { Link } from "react-router-dom";

interface userProps {
    user: any
};

export default function ActionButtons(props: userProps) {
    const { dni, name, status } = props.user;
    const classes = useRolesStyle();
    const [showDialog, setShowDialog] = useState(false);

    const handleStatusClick = () => {
        console.log("Entra!");
        setShowDialog(true);
    };

    const handleClose = () => {
        console.log("CloseDialog");
        setShowDialog(false);
    };

    return(
        <>
        <div className={classes.actionContent}>
            <FormControlLabel
              label=""
              control={
                <Link to={`/roles/${dni}`}>
                    <IconButton
                    color="secondary"
                    aria-label="editar"
                    >
                        <EditIcon style={{ color: '#3366FF' }} />
                    </IconButton>
                </Link>
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
        { showDialog && <ShowDialog isOpen={showDialog} data={{name, dni, status}} handleCloseDialog={handleClose} />}
        </>
    );
};
