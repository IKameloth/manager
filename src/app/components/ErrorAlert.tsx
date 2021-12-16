import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  styled,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../store/common";
import SvgWarningImage from "@/assets/images/SvgWarningImage";
import { MotionContainer, MotionItemUp } from "./Motion";

interface ErrorDialog {
  open: boolean;
  message: string;
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

const ErrorAlert = ({ open, message }: ErrorDialog) => {
  const [openError, setOpenError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setOpenError(true);
    }
  }, [open]);

  const handleClose = () => {
    setOpenError(false);
    dispatch(setErrorMessage(""));
  };

  return (
    <MotionContainer>
      <StyledDialog open={openError} onClose={handleClose}>
        <DialogTitle>
          <MotionItemUp>{<SvgWarningImage />}</MotionItemUp>
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

export default ErrorAlert;
