import React, { useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import Section from "@/app/components/Section";
import SearchSensor from "@/app/components/Sensor/SearchSensor";
import { Container, Grid } from "@material-ui/core";
import RegisterSensor from "@/app/components/Sensor/RegisterSensor";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

export default function ShowSensor() {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleRegisterSensor = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Container>
      <Section>
        <Grid container spacing={8}>
          <TitleBar
            title="lector de huellas"
            subTitle="administración y control de lectores"
            btnText={isRegister ? "Consultar lector" : "Registrar lector"}
            btnAction={handleRegisterSensor}
            icon={isRegister ? <SearchIcon /> : <AddIcon />}
          />
          {isRegister ? <RegisterSensor /> : <SearchSensor />}
        </Grid>
      </Section>
    </Container>
  );
}
