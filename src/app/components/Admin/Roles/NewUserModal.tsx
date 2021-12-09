import React, { useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  styled,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import { DniReg, EmailReg } from "@/app/helper/Regex";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import { setIsLoading, unsetIsLoading } from "@/app/store/common/operations";
import { createUser, cleanMessage } from "@/app/store/user/operations";
import { Fingerprint, Person, Email } from "@material-ui/icons";
import Loader from "../../Loader";
import { MotionContainer, MotionItemUp } from "../../Motion";
import toast from "react-hot-toast";
import ErrorAlert from "../../ErrorAlert";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface IFormInputs {
  name: string;
  dni: string;
  email: string;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle style={{ textAlign: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: "absolute",
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

const NewUserModal = ({ isOpen, closeModal }: Props) => {
  const dispatcher = useDispatch();
  const { common, user } = useSelector((state: StoreState) => state);
  const { isLoading } = common;
  const { errorMessage, message } = user;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    dispatcher(setIsLoading());
    const { name, dni, email } = data;

    if (!name.trim().length) {
      setError("name", { type: "manual" }, { shouldFocus: true });
    } else if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else if (!email.trim().length) {
      setError("email", { type: "manual" }, { shouldFocus: true });
    } else {
      await dispatcher(createUser(name, dni, email));
    }
    dispatcher(unsetIsLoading());
  };

  useEffect(() => {
    message.length > 0 &&
      toast.success(message, { duration: 7000 }) &&
      dispatcher(cleanMessage()) &&
      closeModal();
  }, [message]);

  return (
    <MotionContainer>
      <Modal open={isOpen} onClose={closeModal} closeAfterTransition>
        <Container>
          <BootstrapDialog
            onClose={closeModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <MotionItemUp>
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={closeModal}
              >
                Registrar usuario
              </BootstrapDialogTitle>
            </MotionItemUp>
            <DialogContent dividers>
              <Grid
                item
                xs={12}
                sm
                container
                alignItems="center"
                justifyContent="center"
              >
                <MotionItemUp>
                  <Typography gutterBottom>
                    Favor de llenar todos los campos.
                  </Typography>
                </MotionItemUp>
                <Grid item xs={12} sm={8} md={8}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <MotionItemUp>
                      <Grid container direction="column" spacing={2}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Nombre"
                          type="text"
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                          {...register("name", { required: true })}
                          error={errors.name ? true : false}
                          helperText={
                            errors.name
                              ? "Debe ingresar un Nombre válido"
                              : "Ingresar Nombre"
                          }
                        />
                        <TextField
                          margin="dense"
                          id="dni"
                          label="Dni"
                          type="text"
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Fingerprint />
                              </InputAdornment>
                            ),
                          }}
                          {...register("dni", {
                            required: true,
                            pattern: DniReg,
                          })}
                          error={errors.dni ? true : false}
                          helperText={
                            errors.dni
                              ? "Debe ingresar un Dni válido"
                              : "Ingresar Dni"
                          }
                        />
                        <TextField
                          margin="dense"
                          id="email"
                          label="Email"
                          type="email"
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email />
                              </InputAdornment>
                            ),
                          }}
                          {...register("email", {
                            required: true,
                            maxLength: 35,
                            pattern: EmailReg,
                          })}
                          error={errors.email ? true : false}
                          helperText={
                            errors.email
                              ? "Debe ingresar un Email válido"
                              : "Ingresar Email"
                          }
                        />
                      </Grid>
                    </MotionItemUp>
                  </form>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <MotionItemUp>
                {isLoading ? (
                  <Loader />
                ) : (
                  <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    Registrar
                  </Button>
                )}
              </MotionItemUp>
            </DialogActions>
          </BootstrapDialog>
        </Container>
      </Modal>
      {errorMessage && (
        <ErrorAlert open={!!errorMessage} message={errorMessage} />
      )}
    </MotionContainer>
  );
};

export default NewUserModal;
