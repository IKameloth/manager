import React, { useEffect, useState } from "react";
import TitleBar from "@/app/components/TitleBar";
import Section from "@/app/components/Section";
import SearchSensor from "@/app/components/Sensor/SearchSensor";
import { Container, Grid } from "@material-ui/core";
import RegisterSensor from "@/app/components/Sensor/RegisterSensor";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import ErrorAlert from "@/app/components/ErrorAlert";
import { setErrorMsg } from "@/app/store/admin";
import { useDispatch } from "react-redux";
import DetailSensor from "./DetailSensor";

export default function ShowSensor() {
  const dispatcher = useDispatch();

  const { common } = useSelector((state: StoreState) => state);
  const { profile, currentCountry, errorMessage } = common;
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isExistSensor, setIsExistSensor] = useState<boolean>(false);
  const [sensor, setSensor] = useState({})
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  const handleRegisterSensor = () => {
    setIsRegister(!isRegister);
  };

  const handleCloseError = () => {
    dispatcher(setErrorMsg(""));
  };

  const handleSensorFound = (sensor: any) => {
    setSensor(sensor)
    setIsExistSensor(true)
    setIsMinimized(true)
  };

  const handleCloseDetails = () => {
    setIsExistSensor(false)
    setIsMinimized(false)
    setSensor({})
  }

  useEffect(() => {
    handleCloseDetails()
  }, [isRegister])

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
          {isRegister ? (
            <RegisterSensor />
          ) : (
            <SearchSensor
              isMinimized={isMinimized}
              token={profile.token}
              country={currentCountry}
              returnSensor={handleSensorFound}
              onClose={handleCloseDetails}
            />
          )}

          {!isRegister && isExistSensor && <DetailSensor sensorData={sensor} onClose={handleCloseDetails} />}
        </Grid>
      </Section>
      {errorMessage && (
        <ErrorAlert
          onOpen={!!errorMessage}
          onClose={handleCloseError}
          message={errorMessage}
        />
      )}
    </Container>
  );
}
