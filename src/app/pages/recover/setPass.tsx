import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  InputAdornment,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store/";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader";
import { useForm, SubmitHandler } from "react-hook-form";
import { Footer, useStyles } from "@/assets/login/recover";
import ErrorAlert from "@/app/components/ErrorAlert";
import Logo from "../../../assets/images/autentia-logo.svg";
import { setIsLoading, unsetIsLoading } from "@/app/store/common/operations";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import HandImg from "@/assets/images/hand.svg";
import { MotionItemUp } from "@/app/components/Motion";
import { setMessageAdmin, userConfirm } from "@/app/store/admin";

interface Props {
  token: string;
  onSuccess: () => void;
}

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

const SetPassView = ({ token, onSuccess }: Props) => {
  const viewMobile = useMediaQuery("(max-width:425px)"); // mobile
  const classes = useStyles();
  const dispatch = useDispatch();
  const { admin, common } = useSelector((state: StoreState) => state);
  const { message } = admin;
  const { isLoggedIn, isLoading, errorMessage } = common;
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    dispatch(setMessageAdmin(""));
    const { password, confirmPassword } = data;

    if (!password.trim().length) {
      setError(
        "password",
        { type: "required", message: "El campo no puede ir vacío" },
        { shouldFocus: true }
      );
    } else if (!confirmPassword.trim().length) {
      setError(
        "confirmPassword",
        { type: "required", message: "El campo no puede ir vacío" },
        { shouldFocus: true }
      );
    } else if (password.trim() !== confirmPassword.trim()) {
      setError("confirmPassword", {
        type: "required",
        message: "Las contraseñas deben coincidir",
      });
    } else {
      dispatch(setIsLoading());
      let res = await dispatch(userConfirm(password, token));

      if (res?.length > 0) {
        toast.success("Contraseña registrada", {
          duration: 5000,
          position: "top-left",
        });
        dispatch(setMessageAdmin(""));
        dispatch(unsetIsLoading());
        return onSuccess();
      } else {
        toast.error("Algo salio mal, intentalo nuevamente", {
          duration: 5000,
          position: "top-right",
        });
        dispatch(setMessageAdmin(""));
        dispatch(unsetIsLoading());
      }
    }
  };

  const handleShowPass = () => setShowPass(!showPass);
  const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.paper}>
      <MotionItemUp>
        <AutentiaTitle />
      </MotionItemUp>
      <Grid item xs>
        <MotionItemUp>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Grid container direction="column" spacing={2}>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                id="password"
                label="Contraseña"
                type={showPass ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleShowPass}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                {...register("password", {
                  required: "Debe ingresar una contraseña válida",
                })}
                error={errors.password ? true : false}
                helperText={
                  errors.password
                    ? errors.password.message
                    : "Ingresar nueva contraseña"
                }
              />
              <TextField
                fullWidth
                margin="dense"
                id="confirmPassword"
                label="Confirmar contraseña"
                type={showConfirmPass ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleShowConfirmPass}
                    >
                      {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                {...register("confirmPassword", {
                  required: "Debe ingresar una contraseña válida",
                })}
                error={errors.confirmPassword ? true : false}
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.message
                    : "Confirmar nueva contraseña"
                }
              />
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  className={classes.submit}
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  OK
                </Button>
              )}
              <Box mt={2}>
                <Link to="/login">
                  <Typography variant="subtitle2" color="secondary">
                    Iniciar sesión
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </form>
        </MotionItemUp>
      </Grid>
      {viewMobile && (
        <Grid item xs>
          <img src={HandImg} alt="AutentiaLogo" />
        </Grid>
      )}
      <Footer>
        <MotionItemUp>
          <FooterContent />
        </MotionItemUp>
      </Footer>
      {errorMessage && (
        <ErrorAlert open={!!errorMessage} message={errorMessage} />
      )}
    </div>
  );
};

const AutentiaTitle = (mobile: any) => (
  <Grid item xs>
    <Box>
      <Typography variant="h3">Autentia</Typography>
      <Typography variant="h3" color="primary">
        Manager
      </Typography>
    </Box>
    <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
      <Typography variant="h5">Ingresar nueva contraseña</Typography>
    </Box>
  </Grid>
);

const FooterContent = () => (
  <Grid item xs>
    <Typography variant="body2" color="textSecondary">
      <img src={Logo} alt="logo" />
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Grid>
);

export default SetPassView;
