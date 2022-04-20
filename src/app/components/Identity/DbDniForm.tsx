import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Check } from "@mui/icons-material";
import { identityStyles } from "@/assets/Identity/generic";
import { useSelector } from "react-redux";
import { TrxList } from "@/app/helper/TrxList";
import { StoreState } from "@/app/store";
import { autentiaTrxCaller, AutentiaHeaderResources } from "../Autentia";
import { ParamsGetType } from "@/app/types";
import Alerts from "@/app/components/Alerts";

export default function DbDniForm() {
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
        setTrxName(TrxList.CL.verifyDniAndBD);
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
    var input = {
      Nac: currentCountry,
    };

    const output = ["erc", "ercDesc", "NroAudit"];

    autentiaTrxCaller({ trxName, options: { input, output } })
      .then((data: ParamsGetType) => {
        let erc = data.ParamsGet.erc;
        let ercDesc = data.ParamsGet.ercDesc;
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
                message: ercDesc,
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
                message: ercDesc,
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
                    Cédula y base de datos
                  </Typography>
                  <Typography variant="body1" className={classes.subTitle}>
                    Búsqueda de Cédulas
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
