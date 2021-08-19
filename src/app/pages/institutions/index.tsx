import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';

export default function Institutions() {

  return(
    <Container>
      <Grid container item xs={12} sm={12} md={12} direction="column" alignItems="center">
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography variant="h4">Instituciones</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};