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
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { MotionContainer, MotionItemUp } from "../Motion";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../Loader";
import { useDispatch } from "react-redux";

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
}

export default function SearchSensor() {
  const dispatcher = useDispatch();
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
    const { serial } = data;

    if (!serial.trim().length) {
      setError(
        "serial",
        { type: "required", message: "Debe ingresar un serial válido" },
        { shouldFocus: true }
      );
    } else {
      console.log(serial);
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
              title="Consultar sensor"
              subheader="Debe ingresar el serial del sensor a consultar"
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
                    <SearchIcon />
                    Consultar
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
