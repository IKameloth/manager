import React from "react";
import { useStyles } from "@/assets/login/recover";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { MotionRightItem } from "../Motion";
import { Fingerprint } from "@material-ui/icons";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { DniReg } from "@/app/helper/Regex";
import toast from "react-hot-toast";
import { recoverPassword, setErrorMsg } from "@/app/store/admin";
import { StoreState } from "@/app/store";
import ErrorAlert from "../ErrorAlert";

interface FormInput {
  dni: string;
}

const FormSendEmail = () => {
  const dispatcher = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const { admin } = useSelector((state: StoreState) => state);
  const { errorMessage } = admin;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    resetField,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsLoading(true);
    const { dni } = data;

    if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else {
      let res = await dispatcher(recoverPassword(dni.toUpperCase()));

      if (typeof res === "string") {
        toast.success("Se ha enviado un email de recuperación", {
          duration: 7000,
        });
      }
      setIsLoading(false);
      resetField("dni");
    }
  };

  const handleCloseError = () => {
    dispatcher(setErrorMsg(""));
  };

  return (
    <Grid item xs>
      <MotionRightItem>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container direction="column" spacing={2}>
            <TextField
              autoFocus
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
                errors.dni ? "Debe ingresar un Dni válido" : "Ingresar Dni"
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
              {isLoading ? <Loader isSize={25} /> : "Recuperar"}
            </Button>
            <Grid item xs>
              <Link to="/login">
                <Typography variant="subtitle2" color="secondary">
                  Iniciar sesión
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

export default FormSendEmail;
