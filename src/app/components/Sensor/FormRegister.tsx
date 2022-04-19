import React, { useState } from "react";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CodeIcon from "@mui/icons-material/Code";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useForm, SubmitHandler } from "react-hook-form";
import { MotionItemUp } from "../Motion";
import { SensorType } from "@/app/types";
import { LogonTypes } from "@/app/helper/LogonTypes";
import Loader from "../Loader";

interface IForm {
  serial: string;
  institution: string;
  location: string;
  logonType: number;
  technology: string;
}

interface Props {
  data?: SensorType;
  title: string;
  onSubmit: (data: IForm) => void;
  currentInstitution?: string;
}

export default function FormRegisterSensor({
  data: sensorData,
  title,
  onSubmit,
  currentInstitution,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<IForm>({
    defaultValues: {
      serial: sensorData?.code || "",
      institution: sensorData?.institution || currentInstitution,
      location: sensorData?.location || "",
    },
  });

  const onSubmitRegister: SubmitHandler<IForm> = async (data) => {
    setIsLoading(true);
    onSubmit(data);
    reset();
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader title={title} />
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
                  disabled={!!sensorData}
                  autoFocus={!sensorData}
                  endAdornment={
                    <InputAdornment position="end">
                      <CodeIcon />
                    </InputAdornment>
                  }
                  {...register("serial", {
                    required: true,
                    validate: { required: (value) => !!value.trim().length },
                  })}
                />
                <FormHelperText>
                  {errors.serial && errors.serial.type === "required" && (
                    <span>Campo requerido</span>
                  )}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl
                disabled={true}
                variant="outlined"
                fullWidth
                error={errors.institution ? true : false}
              >
                <InputLabel htmlFor="institution">Institución</InputLabel>
                <OutlinedInput
                  id="institution"
                  label="institution"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <ApartmentIcon />
                    </InputAdornment>
                  }
                  {...register("institution", {
                    required: true,
                    validate: { required: (value) => !!value.trim().length },
                  })}
                />
                <FormHelperText>
                  {errors.institution && errors.serial?.type === "required" && (
                    <span>Campo requrerido</span>
                  )}
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
                  endAdornment={
                    <InputAdornment position="end">
                      <LocationOnIcon />
                    </InputAdornment>
                  }
                  {...register("location", {
                    required: true,
                    validate: { required: (value) => !!value.trim().length },
                  })}
                />
                <FormHelperText>
                  {errors.location && errors.location?.type === "required" && (
                    <span>Campo requerido</span>
                  )}
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
                  defaultValue={!!sensorData ? sensorData?.logon_type : 1}
                  {...register("logonType", {
                    required: true,
                    valueAsNumber: true,
                    pattern: /[0-9]{1}/,
                  })}
                  error={errors.logonType ? true : false}
                >
                  {LogonTypes.map((item) => (
                    <MenuItem key={item.key} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.logonType && errors.logonType.type === "required" && (
                    <span>Campo requerido</span>
                  )}
                </FormHelperText>
              </FormControl>
            </Grid>
            {!!sensorData && (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  disabled={!!sensorData}
                >
                  <InputLabel htmlFor="registerAt">
                    Fecha de Registro
                  </InputLabel>
                  <OutlinedInput
                    id="registerAt"
                    label="Fecha de Registro"
                    type="text"
                    defaultValue={sensorData?.register_at}
                    endAdornment={
                      <InputAdornment position="end">
                        <AccessTimeIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <FormControl variant="outlined" error={!!errors.technology}>
                  <FormLabel id="row-radio-buttons-group-label">
                    <Typography variant="h5">Tecnología</Typography>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={sensorData?.technology}
                  >
                    <FormControlLabel
                      value="UareU"
                      control={<Radio />}
                      label="UareU"
                      {...register("technology", { required: true })}
                    />
                    <FormControlLabel
                      value="UareU-gold"
                      control={<Radio />}
                      label="UareU-gold"
                      {...register("technology", { required: true })}
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {errors.technology &&
                      errors.technology.type === "required" && (
                        <span>Campo requerido</span>
                      )}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </MotionItemUp>
      </CardContent>
      <CardActions style={{ padding: 16, justifyContent: "center" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Fab
            variant="extended"
            color="primary"
            size="medium"
            onClick={handleSubmit(onSubmitRegister)}
          >
            {!!sensorData ? <EditIcon /> : <AddIcon />}
            {!!sensorData ? "Editar" : "Registrar"}
          </Fab>
        )}
      </CardActions>
    </Card>
  );
}
