import React, { useState, useEffect } from "react";
import { MotionContainer, MotionItemUp } from "@/app/components/Motion";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useForm, SubmitHandler } from "react-hook-form";
import { LogonTypes } from "@/app/helper/LogonTypes";

import CodeIcon from "@material-ui/icons/Code";
import ApartmentIcon from "@material-ui/icons/Apartment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ExtensionIcon from "@material-ui/icons/Extension";

interface Props {
  sensorData: any;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  centered: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  card: {
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
  institution: string;
  location: string;
  locationCode: string;
  logonType: number;
  techonology: string;
  registerAt: string;
}

export default function DetailSensor({ sensorData }: Props) {
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
    const {
      serial,
      institution,
      location,
      locationCode,
      logonType,
      techonology,
    } = data;

    !serial.trim().length &&
      setError("serial", {
        type: "required",
        message: "Ingresar Serial válida",
      });
    !institution.trim().length &&
      setError("institution", {
        type: "required",
        message: "Ingresar Institución válida",
      });
    !location.trim().length &&
      setError("location", {
        type: "required",
        message: "Ingresar una Ubicación válida",
      });
    !locationCode.trim().length &&
      setError("locationCode", {
        type: "required",
        message: "Ingresar un Código de Ubicación válido",
      });
    typeof logonType != "number" &&
      setError("logonType", {
        type: "required",
        message: "Seleccionar un Tipo Logon válido",
      });
    !techonology.trim().length &&
      setError("techonology", {
        type: "required",
        message: "Seleccionar una Tecnología válida",
      });

    console.log(data);
    setIsLoading(false);
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <MotionContainer>
        <Card className={classes.card}>
          <CardHeader title="Detalles del Sensor" />
          <CardContent>
            <MotionItemUp>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.serial ? true : false}
                  >
                    <InputLabel htmlFor="code">Serial</InputLabel>
                    <OutlinedInput
                      id="code"
                      label="Serial"
                      type="text"
                      defaultValue={sensorData.Code}
                      endAdornment={
                        <InputAdornment position="end">
                          <CodeIcon />
                        </InputAdornment>
                      }
                      {...register("serial")}
                    />
                    <FormHelperText>{errors.serial?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.institution ? true : false}
                  >
                    <InputLabel htmlFor="institution">Institución</InputLabel>
                    <OutlinedInput
                      id="institution"
                      label="institution"
                      type="text"
                      defaultValue={sensorData.Institution}
                      endAdornment={
                        <InputAdornment position="end">
                          <ApartmentIcon />
                        </InputAdornment>
                      }
                      {...register("institution")}
                    />
                    <FormHelperText>
                      {errors.institution?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.location ? true : false}
                  >
                    <InputLabel htmlFor="location">Ubicación</InputLabel>
                    <OutlinedInput
                      id="location"
                      label="location"
                      type="text"
                      defaultValue={sensorData.Location}
                      endAdornment={
                        <InputAdornment position="end">
                          <LocationOnIcon />
                        </InputAdornment>
                      }
                      {...register("location")}
                    />
                    <FormHelperText>{errors.location?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.locationCode ? true : false}
                  >
                    <InputLabel htmlFor="LocationCode">
                      Código de ubicación
                    </InputLabel>
                    <OutlinedInput
                      id="LocationCode"
                      label="Código de ubicación"
                      type="text"
                      defaultValue={sensorData.LocationCode}
                      endAdornment={
                        <InputAdornment position="end">
                          <LocationOnIcon />
                        </InputAdornment>
                      }
                      {...register("locationCode")}
                    />
                    <FormHelperText>
                      {errors.locationCode?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={errors.registerAt ? true : false}
                  >
                    <InputLabel htmlFor="registerAt">
                      Fecha de Registro
                    </InputLabel>
                    <OutlinedInput
                      id="registerAt"
                      label="Fecha de Registro"
                      type="text"
                      defaultValue={sensorData.RegisterAt}
                      endAdornment={
                        <InputAdornment position="end">
                          <AccessTimeIcon />
                        </InputAdornment>
                      }
                      {...register("registerAt")}
                    />
                    <FormHelperText>
                      {errors.registerAt?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="LogonType">Tipo Logon</InputLabel>
                    <Select
                      labelId="logonType"
                      id="logonType"
                      label="Tipo Logon"
                      fullWidth
                      variant="outlined"
                      defaultValue={
                        sensorData.LogonType ?? sensorData.LogonType
                      }
                      {...register("logonType")}
                      error={errors.logonType ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <ExtensionIcon />
                        </InputAdornment>
                      }
                    >
                      {LogonTypes.map((item) => (
                        <MenuItem key={item.key} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.logonType?.message}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormControl
                      variant="outlined"
                      error={errors.techonology ? true : false}
                    >
                      <FormLabel id="row-radio-buttons-group-label">
                        <Typography variant="h5">Tecnología</Typography>
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={
                          sensorData.Technology ?? sensorData.Technology
                        }
                      >
                        <FormControlLabel
                          value="UareU"
                          control={<Radio />}
                          label="UareU"
                          {...register("techonology")}
                        />
                        <FormControlLabel
                          value="UareU-gold"
                          control={<Radio />}
                          label="UareU-gold"
                          {...register("techonology")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </MotionItemUp>
          </CardContent>
          <CardActions style={{ padding: 16, justifyContent: "center" }}>
            <MotionItemUp>
              <Fab
                variant="extended"
                color="primary"
                size="medium"
                onClick={handleSubmit(onSubmit)}
              >
                <EditIcon />
                Editar
              </Fab>
            </MotionItemUp>
          </CardActions>
        </Card>
      </MotionContainer>
    </Grid>
  );
}
