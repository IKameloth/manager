import React, { useEffect } from "react";
import { useStyles } from "@/assets/login/recover";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MotionRightItem } from "../Motion";
import { Fingerprint } from "@mui/icons-material";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { DniReg } from "@/app/helper/Regex";
import { recoverPassword, setErrorMsg } from "@/app/store/admin";
import { StoreState } from "@/app/store";
import Alerts from "../Alerts";

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

  useEffect(() => {
    if (errorMessage){
      Alerts({
        message: errorMessage,
        icon: "error",
      }); 
    };
    handleCloseError();
  }, [errorMessage]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsLoading(true);
    const { dni } = data;

    if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else {
      let res = await dispatcher(recoverPassword(dni.toUpperCase()));

      if (typeof res === "string") {
        Alerts({
          message: "Se ha enviado un email de recuperación",
          timer: 7000,
          icon: "success",
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
    </Grid>
  );
};

export default FormSendEmail;
