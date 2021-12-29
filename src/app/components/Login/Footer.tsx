import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Logo from "@/assets/images/autentia-logo.svg";
import { Footer } from "@/assets/login";
import { MotionRightItem } from "../Motion";

const FooterContent = () => (
  <Footer>
    <MotionRightItem>
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
    </MotionRightItem>
  </Footer>
);

export default FooterContent;
