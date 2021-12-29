import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Fingerprint, VpnKey } from "@material-ui/icons";
import { MotionRightItem } from "../Motion";
import { useStyles } from "@/assets/login";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  loginRequest,
  setErrorMessage,
  setIsLoading,
  unsetIsLoading,
} from "@/app/store/common/operations";
import { DniReg } from "@/app/helper/Regex";
import Loader from "@/app/components/Loader";
import { Link } from "react-router-dom";
import { StoreState } from "@/app/store";
import ErrorAlert from "../ErrorAlert";

interface IFormInputs {
  dni: string;
  password: string;
}

const FormLogin = () => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { isLoading, errorMessage } = common;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    dispatcher(setIsLoading());
    const { dni, password } = data;

    if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else if (!password.trim().length) {
      setError("password", { type: "manual" }, { shouldFocus: true });
    } else {
      await dispatcher(loginRequest(dni.toUpperCase(), password));
      dispatcher(unsetIsLoading());
    }
  };

  const handleCloseError = () => {
    dispatcher(setErrorMessage(""));
  };

  return (
    <Grid item xs>
      <MotionRightItem>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container direction="column">
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
                maxLength: 11,
                pattern: DniReg,
              })}
              error={errors.dni ? true : false}
              helperText={
                errors.dni ? "Debe ingresar un Dni válido" : "Ingresar Dni"
              }
            />

            <TextField
              margin="dense"
              id="password"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VpnKey />
                  </InputAdornment>
                ),
              }}
              {...register("password", { required: true })}
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? "Debe ingresar una Contraseña válida"
                  : "Ingresar contraseña"
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
              {isLoading ? <Loader isSize={25} /> : "Ingresar"}
            </Button>

            <Grid item xs>
              <Link to="/recover">
                <Typography variant="subtitle2" color="secondary">
                  ¿Olvidó su contraseña?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </MotionRightItem>
      {errorMessage && (
        <ErrorAlert
          onOpen={!!errorMessage}
          onClose={handleCloseError}
          message={errorMessage}
        />
      )}
    </Grid>
  );
};

export default FormLogin;
