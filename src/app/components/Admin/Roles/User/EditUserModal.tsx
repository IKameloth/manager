import React, { useState } from "react";
import {
  Button,
  Backdrop,
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
  Grow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "@/app/components/Loader";
import { toast } from "react-hot-toast";
import { updateUser } from "@/app/store/admin";
import { EmailReg } from "@/app/helper/Regex";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  token: string;
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

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
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

interface Inputs {
  name: string;
  email: string;
}

const EditUserModal = ({ isOpen, onClose, user, token }: Props) => {
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const { name, email } = data;

    if (!name.trim().length) {
      setError("name", {
        type: "required",
        message: "El campo Nombre no puede ir vacio",
      });
    } else if (!email.trim().length) {
      setError("email", {
        type: "required",
        message: "Debe ingresar un Email válido",
      });
    } else {
      const res = await dispatcher(
        updateUser(user.dni, token, name.trim(), email)
      );
      if ("id" in res) {
        toast.success("Datos actualizados!", { duration: 5000 });
      } else {
        toast.success("UPS!, algo salio mal", { duration: 7000 });
      }
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Grow in={isOpen}>
        <Container>
          <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle onClose={onClose} id={"user-edit"}>
              Editar usuario
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  item
                  xs={12}
                  sm
                  container
                  alignItems="center"
                  justifyContent="center"
                >
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
                      variant="outlined"
                      defaultValue={user.name}
                      {...register("name", {
                        maxLength: 40,
                      })}
                      error={errors.name ? true : false}
                      helperText={errors.name && errors.name.message}
                    />
                    <TextField
                      margin="dense"
                      id="email"
                      label="Email"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={user.email}
                      {...register("email", {
                        maxLength: 50,
                        pattern: EmailReg,
                      })}
                      error={errors.email ? true : false}
                      helperText={errors.email && errors.email.message}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ color: "#209E25" }}
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? <Loader /> : "Editar"}
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Container>
      </Grow>
    </Modal>
  );
};

export default EditUserModal;
