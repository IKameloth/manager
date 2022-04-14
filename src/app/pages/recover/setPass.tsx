import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import { Footer, useStyles } from "@/assets/login/recover";
import Logo from "../../../assets/images/autentia-logo.svg";
import HandImg from "@/assets/images/hand.svg";
import { MotionItemUp } from "@/app/components/Motion";
import FormRegisterPass from "@/app/components/Recover/FormRegisterPass";

interface Props {
  token: string;
  onSuccess: () => void;
}

const SetPassView = ({ token, onSuccess }: Props) => {
  const viewMobile = useMediaQuery("(max-width:425px)"); // mobile
  const classes = useStyles();
  const { common } = useSelector((state: StoreState) => state);
  const { isLoggedIn, errorMessage } = common;

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.paper}>
      <MotionItemUp>
        <AutentiaTitle />
      </MotionItemUp>
      <FormRegisterPass
        token={token}
        onSuccess={onSuccess}
        onError={errorMessage}
      />
      {viewMobile && (
        <Grid item xs>
          <img src={HandImg} alt="AutentiaLogo" />
        </Grid>
      )}
      <Footer>
        <MotionItemUp>
          <FooterContent />
        </MotionItemUp>
      </Footer>
    </div>
  );
};

const AutentiaTitle = (mobile?: object) => (
  <Grid item xs>
    <Box>
      <Typography variant="h3">Autentia</Typography>
      <Typography variant="h3" color="primary">
        Manager
      </Typography>
    </Box>
    <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
      <Typography variant="h5">Ingresar nueva contraseña</Typography>
    </Box>
  </Grid>
);

const FooterContent = () => (
  <Grid item xs>
    <Typography variant="body2" color="textSecondary">
      <img src={Logo} alt="logo" />
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Grid>
);

export default SetPassView;
