import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  IconButtonProps,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { MotionContainer, MotionItemUp } from "../Motion";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { getSensor } from "@/app/store/common";
import { toast } from "react-hot-toast";
import { styled } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

interface Props {
  token: string;
  country: string;
  isMinimized: boolean;
  returnSensor: (sensor: any) => void;
  onClose: () => void;
}

interface FormInput {
  serial: string;
  technology: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchSensor({
  token,
  country,
  isMinimized,
  returnSensor,
  onClose,
}: Props) {
  const dispatcher = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    isMinimized ? setExpanded(false) : setExpanded(true);
  }, [isMinimized]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsLoading(true);
    onClose();
    const { serial, technology } = data;

    if (!serial.trim().length) {
      setError(
        "serial",
        { type: "required", message: "Debe ingresar un serial válido" },
        { shouldFocus: true }
      );
    } else if (!technology) {
      setError("technology", {
        type: "required",
        message: "Debe seleccionar una Tecnología",
      });
    } else {
      const resp = await dispatcher(
        getSensor(serial, country, technology, token)
      );
      typeof resp === "boolean"
        ? toast.error("Sensor no encontrado", {
            position: "top-center",
            duration: 5000,
          })
        : returnSensor(resp);
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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                      {...register("serial")}
                    />
                    <FormHelperText id="serial-error">
                      {errors.serial?.message}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    error={!!errors.technology?.message?.length}
                    variant="outlined"
                  >
                    <br />
                    <FormLabel id="demo-error-radios">
                      Seleccionar Tecnología
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="technology"
                    >
                      <FormControlLabel
                        value="UareU"
                        control={<Radio />}
                        label="UareU"
                        {...register("technology")}
                      />
                      <FormControlLabel
                        value="UareU-gold"
                        control={<Radio />}
                        label="UareU-gold"
                        {...register("technology")}
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {errors.technology?.message}
                    </FormHelperText>
                  </FormControl>
                </MotionItemUp>
              </CardContent>
              <CardActions style={{ padding: 16, justifyContent: "center" }}>
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
            </Collapse>
            {isMinimized && (
              <CardActions>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="mostrar"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            )}
          </Card>
        </MotionContainer>
      </Grid>
    </Box>
  );
}
