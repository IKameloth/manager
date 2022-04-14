import React from "react";
import { MotionContainer } from "@/app/components/Motion";
import { Box, Grid, Typography } from "@mui/material";
import NotFoundImage from "@/assets/images/not-found.svg";

const NotFound = () => {
  return (
    <Grid container spacing={2}>
      <MotionContainer>
        <Box>
          <img src={NotFoundImage} alt="NotFound" />
          <Typography variant="h3">UPS!</Typography>
          <Typography variant="h3" color="primary">
            404 not found
          </Typography>
        </Box>
      </MotionContainer>
    </Grid>
  );
};

export default NotFound;
