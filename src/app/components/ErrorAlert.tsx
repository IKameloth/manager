import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { cleanErrorMessage } from "../store/common";
import { AnimatePresence } from 'framer-motion';
import SvgWarningImage from '@/assets/images/SvgWarningImage';

interface ErrorDialog {
  open: boolean;
  message: string;
}

const ErrorAlert = ({open, message}: ErrorDialog) => {

  const [ openError, setOpenError ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setOpenError(true);
    }
  }, [open]);

  const handleClose = () => {
    setOpenError(false);
    dispatch(cleanErrorMessage());
  }

  return (
    <AnimatePresence>
      <Dialog
      open={openError}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>{<SvgWarningImage />}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
      </DialogContent>
      <DialogActions style={{justifyContent: "center", paddingBottom: 20}}>
          <Button style={{borderRadius: 200}} onClick={handleClose} variant="contained" color="primary">
            OK
          </Button>
      </DialogActions>
      </Dialog>
    </AnimatePresence>
  )
}

export default ErrorAlert
