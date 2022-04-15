import React, { useEffect, useState, FC } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import { MotionContainer, MotionItemUp } from "../Motion";
import { useDispatch } from "react-redux";
import { createSensor, getSensor } from "@/app/store/common";
import { styled } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormGetSensor from "./FormGet";
import FormRegisterSensor from "./FormRegister";
import Alerts from "../Alerts";

const useStyles = makeStyles(() => ({
  centered: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
  },
}));

interface Props {
  token: string;
  country: string;
}

type Sensor = {
  serial: string;
  institution: string;
  location: string;
  locationCode: string;
  logonType: number;
  technology: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

const SearchSensor: FC<Props> = ({ token, country }) => {
  const dispatcher = useDispatch();
  const classes = useStyles();
  const [isExpanded, setIsExpaded] = useState<boolean>(false);
  const [sensor, setSensor] = useState<any>();

  const handleExpandClick = () => setIsExpaded(!isExpanded);
  // const handleCloseError = () => dispatcher(setErrorMessage(""));

  const handleSubmit = async (serial: string, tech: string) => {
    setSensor(undefined);
    const resp = await dispatcher(getSensor(serial, country, tech, token));
    if ("Code" in resp) {
      setIsExpaded(false);
      setSensor(resp);
    }
  };

  const handleSubmitRegister = async (data: Sensor) => {
    console.log(data)
    const resp = await dispatcher(
      createSensor(
        data.serial,
        data.institution,
        country,
        data.location,
        data.locationCode,
        data.logonType,
        data.technology,
        token
      )
    );

    console.log(resp)
  }

  return (
    <>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="100%"
      >
        <Grid item xs={12} sm={6} md={8} lg={4}>
          <MotionContainer>
            <Card className={classes.card}>
              <CardHeader title="Consultar Sensor" />
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.centered}>
                  <MotionItemUp>
                    <FormGetSensor onSubmit={handleSubmit} />
                  </MotionItemUp>
                </CardContent>
              </Collapse>
              {!isExpanded && (
                <CardActions>
                  <ExpandMore
                    expand={isExpanded}
                    onClick={handleExpandClick}
                    aria-expanded={isExpanded}
                    aria-label="mostrar"
                  >
                    <ExpandMoreIcon color="primary" />
                  </ExpandMore>
                </CardActions>
              )}
            </Card>
          </MotionContainer>
        </Grid>
      </Box>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <MotionContainer>
          {!!sensor && (
            <FormRegisterSensor title="Detalles del Sensor" data={sensor} onSubmit={handleSubmitRegister} />
          )}
        </MotionContainer>
      </Grid>
    </>
  );
}

export default SearchSensor