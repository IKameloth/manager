import React, { FC, useState } from "react";
import { MotionContainer, MotionItemUp } from "@/app/components/Motion";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StoreState } from "@/app/store";
import { createSensor, getSensor } from "@/app/store/common";
import { SensorType } from "@/app/types";
import {
  Container,
  Grid,
  Box,
  Card,
  CardHeader,
  Collapse,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import TitleBar from "@/app/components/TitleBar";
import FormGetSensor from "@/app/components/Sensor/FormGet";
import FormRegisterSensor from "@/app/components/Sensor/FormRegister";
import Alerts from "@/app/components/Alerts";

type IForm = {
  serial: string;
  institution: string;
  location: string;
  logonType: number;
  technology: string;
};

const SearchSensor: FC = () => {
  let history = useHistory();
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { currentCountry, profile } = common;
  const [isExpanded, setIsExpaded] = useState<boolean>(true);
  const [sensor, setSensor] = useState<SensorType | undefined>();

  const handlerSubmit = async (serial: string, tech: string) => {
    !!sensor && setSensor(undefined);
    const res: SensorType | {} = await dispatcher(
      getSensor(serial, currentCountry, tech, profile.token)
    );

    if ("code" in res) {
      setIsExpaded(false);
      setSensor(res);
    } else {
      Alerts({
        message: "Lector no encontrado",
        timer: 4000,
        icon: "error",
      });
    }
  };

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
        message: "Lector actualizado con exito",
        timer: 4000,
        icon: "success",
      });
      setIsExpaded(true);
      setSensor(undefined);
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
            title="lectura de huellas"
            subTitle="administración y control de lectores"
            btnText="Registrar lector"
            icon={<AddIcon />}
            btnAction={() => history.push("/sensor/register")}
          />

          <Box
            alignContent="center"
            justifyContent="center"
            display="flex"
            width="100%"
            mt="16px"
          >
            <Grid item lg={4}>
              <MotionItemUp>
                <Card>
                  <CardHeader title="Consultar Sensor" />
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <MotionItemUp>
                        <FormGetSensor onSubmit={handlerSubmit} />
                      </MotionItemUp>
                    </CardContent>
                  </Collapse>
                  {!!sensor && (
                    <CardActions style={{ justifyContent: "center" }}>
                      <IconButton
                        onClick={() => setIsExpaded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-label="show-form"
                      >
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </CardActions>
                  )}
                </Card>
              </MotionItemUp>
            </Grid>
          </Box>
          {/* SHOW SENSOR */}
          {!!sensor && (
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
                  data={sensor}
                />
              </Grid>
            </Box>
          )}
        </Grid>
      </MotionContainer>
    </Container>
  );
};

export default SearchSensor;
