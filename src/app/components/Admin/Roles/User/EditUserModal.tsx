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
import { updateUser } from "@/app/store/admin";
import { EmailReg } from "@/app/helper/Regex";
import { UserType } from "@/app/types";
import Alerts from "@/app/components/Alerts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType;
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
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if(user){
      setIsLoading(true);
      const { name, email } = data;
      const { dni, status } = user;
  
      const resp = await dispatcher(updateUser(dni, status, token, name, email));
      ("id" in resp) && Alerts({ message: "Datos actualizados!", timer: 5000, icon: "success" });
      onClose();
  
      setIsLoading(false);
    }
  };
  if(!user){
    onClose();
    return <></>
  }
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
                        required: true,
                        maxLength: 40,
                        validate: {
                          required: (value) => !!value.trim().length,
                        },
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
                        required: true,
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
