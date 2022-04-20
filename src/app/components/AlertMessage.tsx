import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  styled,
} from "@mui/material";
import { MotionContainer, MotionItemUp } from "./Motion";

interface ErrorDialog {
  onOpen: boolean;
  onClose: () => void;
  message: string;
  icon?: JSX.Element;
}

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
  "& .MuiDialogTitle-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiButtonBase-root": {
    borderRadius: 200,
  },
}));

const AlertMessage = ({ onOpen, onClose, message, icon }: ErrorDialog) => {
  const [openError, setOpenError] = useState(false);
  
  useEffect(() => {
    if (onOpen) {
      setOpenError(true);
    }
  }, [onOpen]);

  const handleClose = () => {
    setOpenError(false);
    onClose();
  };

  return (
    <MotionContainer>
      <StyledDialog open={openError} onClose={handleClose}>
        <DialogTitle>
          <MotionItemUp>{icon}</MotionItemUp>
        </DialogTitle>
        <DialogContent>
          <MotionItemUp>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </MotionItemUp>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center", paddingBottom: 20 }}>
          <MotionItemUp>
            <Button
              autoFocus
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              OK
            </Button>
          </MotionItemUp>
        </DialogActions>
      </StyledDialog>
    </MotionContainer>
  );
};

export default AlertMessage;
