import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Fingerprint, VpnKey } from "@mui/icons-material";
import { MotionRightItem } from "../Motion";
import { useStyles } from "@/assets/login";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest, setErrorMessage } from "@/app/store/common/operations";
import { DniReg } from "@/app/helper/Regex";
import Loader from "@/app/components/Loader";
import { Link, Redirect } from "react-router-dom";
import { StoreState } from "@/app/store";
import Alerts from "../Alerts";

interface IFormInputs {
  dni: string;
  password: string;
}

const FormLogin = () => {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { errorMessage } = common;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (errorMessage){
      Alerts({
        message: errorMessage,
        icon: "error",
      }); 
    };
    handleCloseError();
  }, [errorMessage]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    const { dni, password } = data;

    if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else if (!password.trim().length) {
      setError("password", { type: "manual" }, { shouldFocus: true });
    } else {
      let res: any = await dispatcher(
        loginRequest(dni.toUpperCase(), password)
      );
      if (res.type != "SET_ERROR_MESSAGE") return <Redirect to="/" />;
    }
    setIsLoading(false);
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
              autoComplete="off"
              autoFocus
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
                errors.dni ? "Debe ingresar un Dni v??lido" : "Ingresar Dni"
              }
            />

            <TextField
              margin="dense"
              id="password"
              label="Contrase??a"
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
                  ? "Debe ingresar una Contrase??a v??lida"
                  : "Ingresar contrase??a"
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
                  ??Olvid?? su contrase??a?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </MotionRightItem>
    </Grid>
  );
};

export default FormLogin;
