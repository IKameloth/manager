import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CardActions,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Loader from "../Loader";
import SearchIcon from "@material-ui/icons/Search";

interface Props {
  onSubmit: (sensor: string, tech: string) => void
}

interface IForm {
  serial: string;
  tech: string;
}

const FormGetSensor = ({onSubmit}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const sendForm: SubmitHandler<IForm> = (data) => {
    setIsLoading(true);
    const { serial, tech } = data;
    onSubmit(serial.trim(), tech)
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(sendForm)}>
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
          {...register("serial", {required: true, validate: { required: (value) => !!value.trim().length} })}
        />
        <FormHelperText id="serial-error">
          {errors.serial && errors.serial.type === "required" && <span>Campo requerido</span>}
        </FormHelperText>
      </FormControl>

      <FormControl error={!!errors.tech} variant="outlined">
        <br />
        <FormLabel id="demo-error-radios">Seleccionar Tecnología</FormLabel>
        <RadioGroup aria-labelledby="demo-error-radios" name="tech">
          <FormControlLabel
            value="UareU"
            control={<Radio />}
            label="UareU"
            {...register("tech", {required: true})}
          />
          <FormControlLabel
            value="UareU-gold"
            control={<Radio />}
            label="UareU-gold"
            {...register("tech", {required: true})}
          />
        </RadioGroup>
        <FormHelperText>{errors.tech && errors.tech.type === "required" && <span>Campo requerido</span>}</FormHelperText>
      </FormControl>
      <CardActions style={{ padding: 16, justifyContent: "center" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Fab
            variant="extended"
            color="primary"
            onClick={handleSubmit(sendForm)}
            size="medium"
          >
            <SearchIcon />
            Consultar
          </Fab>
        )}
      </CardActions>
    </form>
  );
};

export default FormGetSensor;
