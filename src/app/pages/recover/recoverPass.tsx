import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Redirect } from "react-router";
import { Paper, Grid, useMediaQuery } from "@material-ui/core";
import { useStyles } from "../../../assets/login/recover";
import LoginImage from "@/assets/images/img-login.svg";
import LoginImagePlus from "@/assets/images/img-login-2.svg";
import { MotionLeftContainer } from "@/app/components/Motion";
import FormSendEmail from "@/app/components/Recover/FormSendEmail";
import AutentiaTitle from "@/app/components/Login/AutentiaTitle";
import FooterContent from "@/app/components/Login/Footer";

const RecoverPass = () => {
  const classes = useStyles();
  const { common } = useSelector((state: StoreState) => state);
  const { isLoggedIn } = common;
  const viewMobile = useMediaQuery("(max-width:425px)"); // mobile
  const viewTablet = useMediaQuery("(max-width:959px)"); // tablet

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <MotionLeftContainer>
        <Grid container spacing={2} style={{ height: "100vh" }}>
          {!viewMobile && (
            <Grid item sm={6} md={8} className={classes.bg}>
              {viewTablet ? (
                <img
                  src={LoginImagePlus}
                  alt="AutentiaLogo"
                  className={classes.img}
                />
              ) : (
                <img
                  src={LoginImage}
                  alt="AutentiaLogo"
                  className={classes.img}
                />
              )}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component={Paper}
            elevation={0}
            square
          >
            <div className={classes.paper}>
              <AutentiaTitle
                mobile={viewMobile}
                subTitle="Recuperar contraseña"
              />
              <FormSendEmail />
              <FooterContent />
            </div>
          </Grid>
        </Grid>
      </MotionLeftContainer>
    </Grid>
  );
};

export default RecoverPass;
