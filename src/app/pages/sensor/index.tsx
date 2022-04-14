import React, { useState, useEffect } from "react";
import TitleBar from "@/app/components/TitleBar";
import Section from "@/app/components/Section";
import { Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import SearchSensor from "@/app/components/Sensor/Search";
import RegisterSensor from "@/app/components/Sensor/Register";

export default function Sensor() {
  const { common } = useSelector((state: StoreState) => state);
  const { profile, currentCountry, errorMessage } = common;
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleActionOptions = () => {
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
            btnAction={handleActionOptions}
            icon={isRegister ? <SearchIcon /> : <AddIcon />}
          />
          {isRegister ? (
            <RegisterSensor token={profile.token} country={currentCountry} anyError={errorMessage} />
          ) : (
            <SearchSensor token={profile.token} country={currentCountry} anyError={errorMessage} />
          )}
        </Grid>
      </Section>
    </Container>
  );
}
