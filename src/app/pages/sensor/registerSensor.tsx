import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { StoreState } from "@/app/store";
import { createSensor } from "@/app/store/common/operations";
import { MotionContainer } from "@/app/components/Motion";
import { Container, Grid, Box } from "@mui/material";
import TitleBar from "@/app/components/TitleBar";
import SearchIcon from "@mui/icons-material/Search";
import FormRegisterSensor from "@/app/components/Sensor/FormRegister";
import Alerts from "@/app/components/Alerts";

type IForm = {
  serial: string;
  institution: string;
  location: string;
  logonType: number;
  technology: string;
};

const RegisterSensor: FC = () => {
  let history = useHistory();
  const { common } = useSelector((state: StoreState) => state);
  const { profile, currentCountry, currentInstitution } = common;
  const dispatcher = useDispatch();

  const handleEditSensor = async ({
    serial,
    institution,
    location,
    logonType,
    technology,
  }: IForm) => {
    const res: boolean | {} = await dispatcher(
      createSensor(
        serial,
        institution,
        currentCountry,
        location,
        logonType,
        technology,
        profile.token
      )
    );
    if (!!res) {
      Alerts({
        message: "Lector registrado con exito",
        timer: 4000,
        icon: "success",
      });
    } else {
      Alerts({
        message: "Lector no encontrado o datos incorrectos",
        timer: 4000,
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <MotionContainer>
        <Grid container spacing={8}>
          <TitleBar
            title="Registrar lector"
            subTitle="administración y control de lectores"
            btnText="Consultar lector"
            icon={<SearchIcon />}
            btnAction={() => history.push("/sensor")}
          />
          <Box
            padding="16px 16px"
            alignContent="center"
            justifyContent="center"
            display="flex"
          >
            <Grid item lg={8}>
              <FormRegisterSensor
                onSubmit={handleEditSensor}
                title="Detalles del sensor"
                currentInstitution={currentInstitution}
              />
            </Grid>
          </Box>
        </Grid>
      </MotionContainer>
    </Container>
  );
};

export default RegisterSensor;
