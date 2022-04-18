import React, { useState } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  Box,
  Card,
  CardHeader,
  CardActions,
  Fab,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import AddIcon from "@mui/icons-material/Add";
import { useForm, SubmitHandler } from "react-hook-form";
import { DniReg } from "@/app/helper/Regex";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import {
  addAutentiaRole
} from "@/app/store/common/operations";
import { Fingerprint, Person } from "@mui/icons-material";
import Loader from "../Loader";
import { MotionContainer, MotionItemUp } from "../Motion";
import Alerts from "../Alerts";

interface FormInputs {
  name: string;
  dni: string;
  email: string;
}

const useStyles = makeStyles(() => ({
  centered: {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
  },
  card: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
  },
}));

const AddRole = () => {
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { admin, common } = useSelector((state: StoreState) => state);
  const { profile, currentCountry, currentInstitution } = common;
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    const { name, dni } = data;

    if (!name.trim().length) {
      setError("name", { type: "manual" }, { shouldFocus: true });
    } else if (!dni.trim().length) {
      setError("dni", { type: "manual" }, { shouldFocus: true });
    } else {
      const res = await dispatcher(addAutentiaRole(dni, name, currentInstitution, currentCountry, profile.token));

      if ("status" in res) {
        Alerts({
          title: "Asignado!",
          icon: 'success',
          message: "Rol asignado con éxito",
          timer: 7000
        })
      }
    }
    setIsLoading(false);
  };

  return (
    <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="100%"
        >
        <Grid item xs={6} sm={5} md={6} lg={4}>
          <MotionContainer>
            <Card className={classes.card}>
              <CardHeader title="Agregar Rol" />

              
              <Grid item xs={12} sm={8} md={8}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <MotionItemUp>
                          <Grid container direction="column" spacing={2}>
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
                                  pattern: DniReg,
                                  })}
                                  error={errors.dni ? true : false}
                                  helperText={
                                  errors.dni
                                      ? "Debe ingresar un Dni válido"
                                      : "Ingresar Dni"
                                  }
                              />
                              <TextField
                                  margin="dense"
                                  id="name"
                                  label="Rol"
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                      <Person />
                                      </InputAdornment>
                                  ),
                                  }}
                                  {...register("name", {
                                  required: true,
                                  maxLength: 35,
                                  })}
                                  error={errors.name ? true : false}
                                  helperText={
                                  errors.name
                                      ? "Debe ingresar un Nombre válido"
                                      : "Ingresar Nombre del rol"
                                  }
                              />
                          </Grid>
                          <CardActions style={{ padding: 16, justifyContent: "center" }}>
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <Fab
                                variant="extended"
                                color="primary"
                                size="medium"
                                onClick={handleSubmit(onSubmit)}
                              >
                                <AddIcon />
                                Registrar
                              </Fab>
                            )}
                          </CardActions>
                      </MotionItemUp>

                  </form>
              </Grid>
            </Card>
          </MotionContainer>
      </Grid>
    </Box>
  );
};

export default AddRole;
