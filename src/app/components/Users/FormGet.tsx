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
  onSubmit: (dni: string) => void
}

interface IForm {
  dni: string;
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
    const { dni } = data;
    onSubmit(dni)
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(sendForm)}>
      <FormControl
        variant="outlined"
        fullWidth
        error={errors.dni ? true : false}
      >
        <InputLabel htmlFor="dni">Ingresar dni</InputLabel>
        <OutlinedInput
          id="dni"
          label="Ingresar dni"
          type="text"
          autoFocus
          {...register("dni", {required: true, validate: { required: (value) => !!value.trim().length} })}
        />
        <FormHelperText id="dni-error">
          {errors.dni && errors.dni.type === "required" && <span>Campo requerido</span>}
        </FormHelperText>
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
            Buscar
          </Fab>
        )}
      </CardActions>
    </form>
  );
};

export default FormGetSensor;
