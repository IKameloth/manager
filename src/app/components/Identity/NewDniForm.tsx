import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { Check } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { TrxList } from "@/app/helper/TrxList";
import { identityStyles } from "@/assets/Identity/generic";
import { StoreState } from "@/app/store";
import { autentiaTrxCaller, AutentiaHeaderResources } from "../Autentia";
import { ParamsGetType } from "@/app/types";
import Alerts from "@/app/components/Alerts";

export default function NewDniForm() {
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
        setTrxName(TrxList.CL.verifyDniNew);
        SetBtnDisable(false);
        return;
      default:
        Alerts({
          title: "Error",
          message: "FORMULARIO NO DISPONIBLE PARA " + currentCountry,
          icon: "error",
        });
        setMessage("Inhabilitado");
        SetBtnDisable(true);
        return;
    }
  };
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const input = {
      rut: "1",
    };
    const output = [
      "Erc",
      "EnBase",
      "ErcDesc",
      "NroAudit",
      "oNombres",
      "oSexo",
      "oFchNac",
      "NotRut",
      "FecReg",
      "Instit",
      "RutOper",
      "Vigencia",
    ];
    autentiaTrxCaller({ trxName, options: { input, output } })
      .then((data: ParamsGetType) => {
        let erc = data.ParamsGet.erc;
        let ErcDesc = data.ParamsGet.ErcDesc;
        let ercText = data.ParamsGet.ercText;
        let Erc = data.ParamsGet.Erc;

        if (erc === 0 && Erc === 0) {
          ercText.length > 0
            ? Alerts({
                title: "Dni Nuevo",
                message: ercText,
                icon: "error",
              })
            : Alerts({
                title: "Dni Antiguo",
                message: ErcDesc,
                icon: "success",
              });
        } else {
          ercText.length > 0
            ? Alerts({
                title: "Dni Antiguo",
                message: ercText,
                icon: "error",
              })
            : Alerts({
                title: "Dni Antiguo",
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
                    Cédula nueva
                  </Typography>
                  <Typography variant="body1" className={classes.subTitle}>
                    Verificación de cédula nueva
                  </Typography>
                </Grid>
              </Grid>
              <form>
                <Grid item style={{ marginTop: viewMobile ? "10px" : "0px" }}>
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
