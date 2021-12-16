import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { MotionRightItem } from "../Motion";

interface Props {
  mobile: boolean;
}

const AutentiaTitle = ({ mobile }: Props) => (
  <Grid item xs>
    <MotionRightItem>
      <Box>
        <Typography variant="h3">Autentia</Typography>
        <Typography variant="h3" color="primary">
          Manager
        </Typography>
      </Box>
      <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
        <Typography variant="h5">Ingresar</Typography>
      </Box>
    </MotionRightItem>
  </Grid>
);

export default AutentiaTitle;
