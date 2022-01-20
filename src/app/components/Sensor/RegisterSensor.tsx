import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { MotionContainer, MotionItemUp } from "../Motion";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../Loader";
import AddIcon from "@material-ui/icons/Add";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BuildIcon from "@material-ui/icons/Build";
import ExtensionIcon from "@material-ui/icons/Extension";
import { Visibility } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
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

interface FormInput {
  serial: string;
  location: string;
  logonType: string;
  tech: string;
}

export default function RegisterSensor() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsLoading(true);
    const { serial, location, logonType, tech } = data;

    if (!serial.trim().length) {
      setError(
        "serial",
        { type: "required", message: "Debe ingresar un serial válido" },
        { shouldFocus: true }
      );
    }

    if (!location.length) {
      setError(
        "location",
        {
          type: "required",
          message: "Debe ingresar una ubicación válida",
        },
        { shouldFocus: true }
      );
    }

    if (!logonType.length) {
      setError(
        "logonType",
        {
          type: "required",
          message: "Debe ingresar una tipo válido",
        },
        { shouldFocus: true }
      );
    }

    if (!tech.length) {
      setError(
        "tech",
        {
          type: "required",
          message: "Debe seleccionar una teconología válida",
        },
        { shouldFocus: true }
      );
    }

    if ((serial.length, location.length, logonType.length, tech.length)) {
      console.log({ serial, location, logonType, tech });
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
      <Grid item xs={12} sm={6} md={8} lg={4}>
        <MotionContainer>
          <Card className={classes.card}>
            <CardHeader
              title="Registrar sensores"
              subheader="Debe completar todos lo campos requeridos"
            />
            <CardContent className={classes.centered}>
              <MotionItemUp>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={errors.serial ? true : false}
                >
                  <InputLabel htmlFor="serial">Ingresar serial</InputLabel>
                  <OutlinedInput
                    id="serial"
                    label="Ingresar serial"
                    type="text"
                    autoFocus
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <FingerprintIcon />
                      </InputAdornment>
                    }
                    {...register("serial")}
                  />
                  <FormHelperText id="serial-error">
                    {errors.serial?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  error={errors.location ? true : false}
                >
                  <InputLabel htmlFor="location">Ingresar ubicación</InputLabel>
                  <OutlinedInput
                    id="location"
                    label="Ingresar ubicación"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <LocationOnIcon />
                      </InputAdornment>
                    }
                    {...register("location")}
                  />
                  <FormHelperText id="location-error">
                    {errors.location?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  error={errors.logonType ? true : false}
                >
                  <InputLabel htmlFor="logonType">Tipo de logon</InputLabel>
                  <OutlinedInput
                    id="logonType"
                    label="Tipo de logon"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <ExtensionIcon />
                      </InputAdornment>
                    }
                    {...register("logonType")}
                  />
                  <FormHelperText id="logonType-error">
                    {errors.logonType?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  error={errors.tech ? true : false}
                >
                  <InputLabel htmlFor="tech">Tecnología</InputLabel>
                  <OutlinedInput
                    id="tech"
                    label="Tecnología"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <BuildIcon />
                      </InputAdornment>
                    }
                    {...register("tech")}
                  />
                  <FormHelperText id="tech-error">
                    {errors.tech?.message}
                  </FormHelperText>
                </FormControl>
              </MotionItemUp>
            </CardContent>
            <CardActions style={{ padding: 16 }}>
              <MotionItemUp>
                {isLoading ? (
                  <Loader />
                ) : (
                  <Fab
                    variant="extended"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    size="medium"
                  >
                    <AddIcon />
                    Registrar
                  </Fab>
                )}
              </MotionItemUp>
            </CardActions>
          </Card>
        </MotionContainer>
      </Grid>
    </Box>
  );
}
