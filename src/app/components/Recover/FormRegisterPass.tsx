import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loader from "@/app/components/Loader";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { MotionItemUp } from "../Motion";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "@/assets/login/recover";
import { userConfirm } from "@/app/store/admin";
import { setErrorMessage } from "@/app/store/common";
import { AnimatePresence, motion } from "framer-motion";
import Alerts from "../Alerts";

interface FormInputs {
  password: string;
  confirmPassword: string;
}

interface Props {
  token: string;
  onSuccess: () => void;
  onError: string;
}

const FormRegisterPass = ({ token, onSuccess, onError }: Props) => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseError = () => {
    dispatcher(setErrorMessage(""));
  };

  useEffect(() => {
    if (onError){
      Alerts({
        message: onError,
        icon: "error",
      }); 
    };
    handleCloseError();
  }, [onError]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
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
      setIsLoading(true);

      let res = await dispatcher(userConfirm(password, token));

      if (typeof res === "string") {
        Alerts({
          message: "Contraseña registrada",
          timer: 5000,
          icon: "success",
        });

        return onSuccess();
      }
    }
    setIsLoading(false);
  };

  const handleShowPass = () => setShowPass(!showPass);
  const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  return (
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
                    {showPass ? (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Visibility />
                      </motion.div>
                    ) : (
                      <VisibilityOff />
                    )}
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
                    {showConfirmPass ? (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Visibility />
                      </motion.div>
                    ) : (
                      <VisibilityOff />
                    )}
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
            <Button
              className={classes.submit}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <Loader isSize={25} /> : "OK"}
            </Button>
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
  );
};

export default FormRegisterPass;
