import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Check } from "@mui/icons-material";
import { DniRegCl } from "@/app/helper/Regex";
import { identityStyles } from "@/assets/Identity/generic";
import { useSelector } from "react-redux";
import { TrxList } from "@/app/helper/TrxList";
import { StoreState } from "@/app/store";
import { autentiaTrxCaller, AutentiaHeaderResources } from "../Autentia";
import { ParamsGetType } from "@/app/types";
import Alerts from "@/app/components/Alerts";

export default function VerificationForm() {
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry } = common;
  const [trxName, setTrxName] = useState<string>("");
  const [btnDisable, SetBtnDisable] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("Verificación");

  useEffect(() => {
    FilterCountry();
  }, [currentCountry]);

  const FilterCountry = () => {
    switch (currentCountry) {
      case "CHILE":
        setTrxName(TrxList.CL.verifyBase);
        SetBtnDisable(false);
        break;
      default:
        Alerts({
          title: "Error",
          message: "FORMULARIO NO DISPONIBLE PARA " + currentCountry,
          icon: "error",
        });
        setMessage("Inhabilitado");
        SetBtnDisable(true);
        break;
    }
  };
  type FormValues = {
    dni: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { dni } = data;

    const input = {
      rut: dni,
      Nac: currentCountry,
    };

    const output = ["erc", "ercDesc", "NroAudit"];

    autentiaTrxCaller({ trxName, options: { input, output } })
      .then((data: ParamsGetType) => {
        let erc = data.ParamsGet.erc;
        let ErcDesc = data.ParamsGet.ercDesc;
        let ercText = data.ParamsGet.ercText;

        if (erc === 0) {
          ercText.length > 0
            ? Alerts({
                title: "Verificación",
                message: ercText,
                icon: "error",
              })
            : Alerts({
                title: "Verificación",
                message: ErcDesc,
                icon: "success",
              });
        } else {
          ercText.length > 0
            ? Alerts({
                title: "Verificación",
                message: ercText,
                icon: "error",
              })
            : Alerts({
                title: "Verificación",
                message: ErcDesc,
                icon: "error",
              });
        }
      })
      .catch((err) => console.log("error ", err));
  };

  const classes = identityStyles();
  const viewMobile = useMediaQuery("(max-width:425px)");

  return (
    <>
      <AutentiaHeaderResources />
      <Grid item xs={12} md={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm
              container
              alignItems="center"
              justifyContent="center"
              style={{ margin: "9px 25px" }}
            >
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="h4" className={classes.title}>
                    Verificación
                  </Typography>
                  <Typography variant="body1" className={classes.subTitle}>
                    Administración y control de la verificación
                  </Typography>
                </Grid>
              </Grid>
              <form>
                <Grid item style={{ marginTop: viewMobile ? "10px" : "0px" }}>
                  <TextField
                    margin="dense"
                    id="dni"
                    label="Dni"
                    type="text"
                    fullWidth
                    disabled={btnDisable}
                    variant="outlined"
                    {...register("dni", {
                      required: true,
                      maxLength: 11,
                      pattern: DniRegCl,
                    })}
                    error={errors.dni ? true : false}
                    helperText={
                      errors.dni
                        ? "Debe ingresar un Dni válido "
                        : "Ingresar Dni "
                    }
                  />
                  <Button
                    className="btn"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={btnDisable}
                    startIcon={<Check />}
                    style={{ borderRadius: 20 }}
                  >
                    {message}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
