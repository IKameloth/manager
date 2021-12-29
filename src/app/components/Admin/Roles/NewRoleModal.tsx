import React, { useState } from "react";
import {
  Button,
  Backdrop,
  Modal,
  styled,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Grow,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import { MotionItemUp } from "../../Motion";
import { AvailableRoles } from "@/app/helper/AvailableRoles";
import { useDispatch } from "react-redux";
import { assignRole, getAllRolesByUser } from "@/app/store/admin";
import Loader from "../../Loader";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  country: string;
  institution: string;
  userDni: string | undefined;
  userId: string;
  onCloseModal: () => void;
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

const NewRoleModal = ({
  isOpen,
  country,
  institution,
  userDni,
  userId,
  onCloseModal,
}: Props) => {
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const { roleName } = data;
    if (!roleName.trim().length) {
      setError("roleName", {
        type: "required",
        message: "El campo no puede ir vacio",
      });
    } else {
      if (userDni) {
        await dispatcher(assignRole(userDni, roleName, institution, country));

        await dispatcher(getAllRolesByUser(userId));
        toast.success("Rol registrado", { duration: 4000 });
      }
      setIsLoading(false);
      onCloseModal();
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
                  type="submit"
                  variant="outlined"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader isSize={25} /> : "Registrar"}
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
