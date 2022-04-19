import React, { FC, useState } from "react";
import { MotionContainer, MotionItemUp } from "@/app/components/Motion";
import TitleBar from "@/app/components/TitleBar";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import FormGetSensor from "@/app/components/Sensor/FormGet";
import FormRegisterSensor from "@/app/components/Sensor/FormRegister";
import { StoreState } from "@/app/store";
import { createSensor, getSensor } from "@/app/store/common";
import { SensorType } from "@/app/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type IForm = {
  serial: string;
  institution: string;
  location: string;
  locationCode: string;
  logonType: number;
  technology: string;
};

export const SearchSensor: FC = () => {
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
      toast.error("Lector no encontrado");
    }
  };

  const handleEditSensor = async ({
    serial,
    institution,
    location,
    locationCode,
    logonType,
    technology,
  }: IForm) => {
    console.log("edit submit", sensor);
    const res = await dispatcher(
      createSensor(
        serial,
        institution,
        currentCountry,
        location,
        locationCode,
        logonType,
        technology,
        profile.token
      )
    );

    console.log(res)
  };

  return (
    <Container>
      <MotionContainer>
        <Grid container spacing={8}>
          <TitleBar
            title="lectura de huellas"
            subTitle="administración y control de lectores"
          />

          <Box
            alignContent="center"
            justifyContent="center"
            display="flex"
            width="100%"
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
