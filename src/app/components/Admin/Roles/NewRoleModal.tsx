import React from "react";
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
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { MotionContainer, MotionItemUp } from "../../Motion";
import { AvailableRoles } from "@/app/helper/AvailableRoles";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onRegister: (role: string) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    minWidth: 300,
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

interface IFormInput {
  roleName: string;
}

const NewRoleModal = ({ isOpen, onCloseModal, onRegister }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { roleName } = data;
    if (!roleName.trim().length) {
      setError("roleName", {
        type: "required",
        message: "El campo no puede ir vacio",
      });
    } else {
      onRegister(roleName);
    }
  };

  return (
    <Modal
      closeAfterTransition
      open={isOpen}
      onClose={onCloseModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Grow in={isOpen}>
        <Container>
          <BootstrapDialog
            onClose={onCloseModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={onCloseModal}
            >
              <MotionItemUp>Registrar Rol</MotionItemUp>
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid item container alignItems="center" justifyContent="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <MotionItemUp>
                    <InputLabel htmlFor="select">Seleccionar rol</InputLabel>
                    <Select
                      {...register("roleName")}
                      fullWidth
                      defaultValue={AvailableRoles[0]}
                    >
                      {AvailableRoles.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.roleName && (
                      <FormHelperText>
                        {errors.roleName?.message}
                      </FormHelperText>
                    )}
                  </MotionItemUp>
                </form>
              </Grid>
            </DialogContent>
            <DialogActions>
              <MotionItemUp>
                <Button
                  style={{ color: "#209E25" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Registrar
                </Button>
              </MotionItemUp>
            </DialogActions>
          </BootstrapDialog>
        </Container>
      </Grow>
    </Modal>
  );
};

export default NewRoleModal;
