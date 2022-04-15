import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
} from "@material-ui/core";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
}));

interface DialogProps {
  isOpen: boolean;
  role: string;
  handleClose: () => void;
  onSubmit: () => void;
}

export default function DeleteRole(props: DialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.isOpen ? setOpen(true) : setOpen(false);
  }, [open]);

  return (
    <>
      <StyledDialog
        open={open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: 250 }}>
          <DialogTitle
            id="alert-dialog-title"
            style={{ textAlign: "center" }}
          >
            <Typography
              component="span"
              variant="h6"
              style={{ fontSize: 18 }}
            >
              ¿Desea eliminar el rol?
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                variant="body2"
                style={{ color: "#000000" }}
              >
                {props.role}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={props.onSubmit}
              autoFocus
              style={{ color: "#FF0000" }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </div>
      </StyledDialog>
    </>
  );
}
