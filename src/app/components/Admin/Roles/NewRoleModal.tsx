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
import { CountriesType, InstitutionType, RoleType, UserType } from "@/app/types";
import Alerts from '@/app/components/Alerts';

type Props = {
  isOpen: boolean
  countryList?: CountriesType
  institList?: [InstitutionType]
  userInfo?: UserType | {}
  onCloseModal: () => void
  rolesData?: [RoleType?]
  token: string
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

type IFormInput = {
  roleSelected: string;
  institSelected: string;
  countrySelected: string;
}

type InstitutionListType = {
  instit: string
  country: string 
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
      if(rolesData && userInfo){
        const arrExists: (InstitutionListType | undefined)[] = rolesData.map(
          (item) => {
            if(item){
              return {
                instit: item.institution.name,
                country: item.institution.country,
              };
            }
          }
        );
        const actualObj: InstitutionListType = {
          instit: institSelected,
          country: countrySelected,
        };
        const result = arrExists.some((item: InstitutionListType | undefined) => {
          if(item){
            return item.country === actualObj.country && item.instit === actualObj.instit
          }
        }
        );
        if ('dni' in userInfo && !result) {
          await dispatcher(
            assignRole(
              userInfo.dni,
              roleSelected,
              institSelected,
              countrySelected,
              token
            )
          );
          Alerts({
            message: 'Rol registrado',
            timer: 4000,
            icon: 'success',
          });
          (await dispatcher(getAllRolesByUser(userInfo.id, token))) &&
            onCloseModal();
        } else {
          Alerts({
            message: `Usuario ya posee un Rol en ${institSelected} ${countrySelected}`,
            timer: 4000,
            icon: 'error',
          });
        }
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
                    {AvailableRoles.map((item: string) => (
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
                    {institList && institList.map((item: InstitutionType) => (
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
                    {countryList && countryList.data?.map((item: string) => (
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
