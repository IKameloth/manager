import React from 'react'
import { Button, Backdrop, Modal, TextField, Typography, styled, Grid, Container, Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    isOpen: boolean
    closeModal: () => void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 10
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle style={{ textAlign: 'center' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "#000000",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const NewUserModal = ({isOpen, closeModal}: Props) => {
    return(
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
      >
        <Grow in={isOpen}>
          <Container>
            <BootstrapDialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={isOpen} >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal}>
                Registrar usuario
              </BootstrapDialogTitle>
              <DialogContent dividers>
                  <Grid item xs={12} sm container alignItems="center" justifyContent="center">
                    <Typography gutterBottom>
                      Favor de llenar todos los campos.
                    </Typography>
                    <Grid item xs={12} sm={8} md={8}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="dni"
                        label="Rut o Dni"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
              </DialogContent>
              <DialogActions>
                <Button style={{color: "#209E25"}} onClick={closeModal}>
                  Registrar
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Container>
          </Grow>
      </Modal>
    )
}

export default NewUserModal