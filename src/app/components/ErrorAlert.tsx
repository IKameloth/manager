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
import { cleanErrorMessage } from "../store/common";
import { AnimatePresence } from "framer-motion";
import SvgWarningImage from "@/assets/images/SvgWarningImage";
import { MotionContainer, MotionItemUp } from "./Motion";

interface ErrorDialog {
  open: boolean;
  message: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
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
    dispatch(cleanErrorMessage());
  };

  return (
    <MotionContainer>
      <StyledDialog
        open={openError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
