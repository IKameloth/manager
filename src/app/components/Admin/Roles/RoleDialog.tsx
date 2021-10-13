import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Typography } from "@material-ui/core";
import { useRolesStyle } from "@/assets/Roles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 10
    },
  }));

interface DialogProps {
    isOpen: boolean;
    data: any;
    handleCloseDialog: () => void;
};

export default function ShowDialog(props: DialogProps) {
    const classes = useRolesStyle();
    const [open, setOpen] = useState(false);
    const { name, dni, status } = props.data;

    useEffect(() => {
      props.isOpen ? setOpen(true) : setOpen(false);
    }, [open]);

    return(
        <div>
            <StyledDialog
                open={open}
                onClose={props.handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: 250 }}>
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                        { status ? 
                            <Typography component="span" variant="h6" style={{ fontSize: 18 }}>Desactivar cuenta</Typography> : 
                            <Typography component="span" variant="h6" style={{ fontSize: 18 }}>Reactivar cuenta</Typography>
                        }
                    </DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText id="alert-dialog-description" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography component="span" variant="body2" style={{ color: '#000000' }}>{name}</Typography>
                            <Typography component="span" variant="body2" style={{ color: '#000000' }}>{dni}</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{justifyContent: 'center'}}>
                        <Button onClick={props.handleCloseDialog} autoFocus style={{ color: `${status ? "#FF0000" : "#209E25"}`}}>
                            { status ? "Desactivar" : "Activar" }
                        </Button>
                    </DialogActions>
                </div>
            </StyledDialog>
        </div>
    );
};