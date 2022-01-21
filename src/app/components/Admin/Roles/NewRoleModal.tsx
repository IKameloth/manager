import React, { useState } from "react";
import {
  Button,
  Backdrop,
  Modal,
  styled,
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
  FormControl,
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
  countryList: any;
  institList: any;
  userInfo: any;
  onCloseModal: () => void;
  rolesData: any;
  token: string;
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
  roleSelected: string;
  institSelected: string;
  countrySelected: string;
}

const NewRoleModal = ({
  isOpen,
  countryList,
  institList,
  userInfo,
  onCloseModal,
  rolesData,
  token,
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
    const { roleSelected, institSelected, countrySelected } = data;
    if (!roleSelected) {
      setError("roleSelected", {
        type: "required",
        message: "Debe seleccionar un Rol",
      });
    } else if (!institSelected) {
      setError("institSelected", {
        type: "required",
        message: "Debe seleccionar una Institución",
      });
    } else if (!countrySelected) {
      setError("countrySelected", {
        type: "required",
        message: "Debe seleccionar un País",
      });
    } else {
      const arrExists: [{ instit: string; country: string }] = rolesData.map(
        (item: any) => {
          return {
            instit: item.institution.name,
            country: item.institution.country,
          };
        }
      );

      const actualObj: any = {
        instit: institSelected,
        country: countrySelected,
      };
      const result = arrExists.some((item: any) =>
        Object.keys(item).every((p: any) => item[p] === actualObj[p])
      );

      if (userInfo.dni && !result) {
        await dispatcher(
          assignRole(
            userInfo.dni,
            roleSelected,
            institSelected,
            countrySelected,
            token
          )
        );

        toast.success("Rol registrado", { duration: 4000 });
        (await dispatcher(getAllRolesByUser(userInfo.id, token))) &&
          onCloseModal();
      } else {
        toast.error(
          `Usuario ya posee un Rol en ${institSelected} ${countrySelected}`,
          {
            duration: 4000,
          }
        );
      }
    }
    setIsLoading(false);
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
              <FormControl variant="outlined" fullWidth margin="dense">
                <MotionItemUp>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    label="Rol"
                    fullWidth
                    variant="outlined"
                    defaultValue={""}
                    {...register("roleSelected")}
                    error={errors.roleSelected ? true : false}
                  >
                    {AvailableRoles.map((item: any) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roleSelected && (
                    <FormHelperText>
                      {errors.roleSelected?.message}
                    </FormHelperText>
                  )}
                </MotionItemUp>
              </FormControl>

              <FormControl variant="outlined" fullWidth margin="dense">
                <MotionItemUp>
                  <InputLabel id="instit-label">Institución</InputLabel>
                  <Select
                    labelId="instit-label"
                    id="institution"
                    label="Institución"
                    fullWidth
                    variant="outlined"
                    defaultValue={""}
                    {...register("institSelected")}
                    error={errors.institSelected ? true : false}
                  >
                    {institList.map((item: any) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.institSelected && (
                    <FormHelperText>
                      {errors.institSelected?.message}
                    </FormHelperText>
                  )}
                </MotionItemUp>
              </FormControl>

              <FormControl variant="outlined" fullWidth margin="dense">
                <MotionItemUp>
                  <InputLabel id="country-label">País</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    label="País"
                    fullWidth
                    variant="outlined"
                    defaultValue={""}
                    {...register("countrySelected")}
                    error={errors.countrySelected ? true : false}
                  >
                    {countryList.data.map((item: any) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.countrySelected && (
                    <FormHelperText>
                      {errors.countrySelected?.message}
                    </FormHelperText>
                  )}
                </MotionItemUp>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <MotionItemUp>
                <Button
                  style={{ color: "#209E25" }}
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
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
