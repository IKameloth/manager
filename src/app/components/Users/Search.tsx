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
} from "@mui/material";
import { makeStyles, styled } from '@mui/styles'
import { MotionContainer, MotionItemUp } from "../Motion";
import { useDispatch, useSelector } from "react-redux";
import { createSensor, getSensor, searchUser } from "@/app/store/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGet from "./FormGet";
import FormView from "./FormView";
import { AutentiaUserType } from "@/app/types";
import { StoreState } from "@/app/store";

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
  token: string
  country: string
  institution: string
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

const Search = ({ token, country, institution }: Props) => {
  const dispatcher = useDispatch();
  const { common } = useSelector((state: StoreState) => state)
  const { autentiaUser } = common
  const classes = useStyles();
  const [isExpanded, setIsExpaded] = useState<boolean>(false);

  useEffect(() => setIsExpaded(true), []);

  const handleExpandClick = () => setIsExpaded(!isExpanded);

  const handleSubmit = async (dni: string) => {
    const resp = await dispatcher(searchUser(token, country, institution, dni));
    if ("Code" in resp) {
      setIsExpaded(false);
    }
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
              <CardHeader title="Buscar Usuario" />
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.centered}>
                  <MotionItemUp>
                    <FormGet onSubmit={handleSubmit} />
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
          {!!autentiaUser && (
            <FormView title="Detalle del Usuario" data={autentiaUser}  />
          )}
        </MotionContainer>
      </Grid>
    </>
  );
}

export default Search