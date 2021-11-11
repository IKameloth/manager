import React from 'react'
import { Button, Modal, TextField, Typography, styled, Grid, Container, Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useForm, SubmitHandler } from 'react-hook-form'
import { validate } from 'uuid';

interface Props {
    isOpen: boolean
    closeModal: () => void
    onRegister: (name: string, dni: string, email: string) => void
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

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface IFormInputs {
    name: string
    dni: string
    email: string
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

const NewUserModal = ({isOpen, closeModal, onRegister}: Props) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, formState: { errors }, handleSubmit, setError } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const {name, dni, email} = data

        if (!name.trim().length) {
            setError("name", { type: "manual" }, { shouldFocus: true })
        } else if (!dni.trim().length) {
            setError("dni", { type: "manual" }, { shouldFocus: true })
        } else {
            onRegister(data.name, data.dni, data.email)
        }
    }

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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                { ...register("name", { required: true }) }
                                error={errors.name ? true : false}
                                helperText={errors.name && "Debe ingresar un Nombre válido"}
                            />
                            <TextField
                                margin="dense"
                                id="dni"
                                label="Rut o Dni"
                                type="text"
                                fullWidth
                                variant="standard"
                                { ...register("dni", { required: true }) }
                                error={errors.dni ? true : false}
                                helperText={errors.dni && "Debe ingresar un Dni o Rut válido"}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                { ...register("email", { required: true , maxLength: 35, pattern: regexEmail}) }
                                error={errors.email ? true : false}
                                helperText={errors.email && "Debe ingresar un Email válido"}
                            />
                        </form>
                    </Grid>
                  </Grid>
              </DialogContent>
              <DialogActions>
                <Button style={{color: "#209E25"}} onClick={handleSubmit(onSubmit)} >
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