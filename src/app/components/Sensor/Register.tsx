import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { MotionContainer } from "../Motion";
import FormRegisterSensor from "./FormRegister";
import { useDispatch } from "react-redux";
import { createSensor, setErrorMessage } from "@/app/store/common/operations";
import Alerts from "../Alerts";

interface Props {
  token: string;
  country: string;
  anyError: string;
}

type Sensor = {
  serial: string;
  institution: string;
  location: string;
  locationCode: string;
  logonType: number;
  technology: string;
};

export default function RegisterSensor({ token, country, anyError }: Props) {
  const dispatcher = useDispatch();
  const handleCloseError = () => dispatcher(setErrorMessage(""));
  const handleSubmit = async (data: Sensor) => {
    console.log(data)
    // const resp = await dispatcher(
    //   createSensor(
    //     data.serial,
    //     data.institution,
    //     country,
    //     data.location,
    //     data.locationCode,
    //     data.logonType,
    //     data.technology,
    //     token
    //   )
    // );

    // console.log(resp)
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <MotionContainer>
          <FormRegisterSensor
            title="Registrar Sensor"
            onSubmit={handleSubmit}
          />
        </MotionContainer>
      </Grid>
    </>
  );
}
