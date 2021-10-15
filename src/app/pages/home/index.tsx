import React from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/app/store';
import { useHomeStyles } from '../../../assets/Home';

export default function Home() {
  const classes = useHomeStyles();
  const { common } = useSelector((state: StoreState) => state);
  const { profile } = common;
  if(!profile.userData){
    return <div></div>
  }
  return (
    <Container>
      <Grid container item xs={12} sm={12} md={12} direction="column" alignItems="center">
        <Paper className={classes.paper} >
          <Grid container className={classes.container} spacing={2}>
            <Grid item xs>
              <Typography variant="h4">Bienvenido</Typography>
              <Typography variant="h6">{profile.userData?.attributes.name}</Typography>
              <Typography variant="body1" style={{marginTop: '6px'}}>
                Recuerda seleccionar el país y la institución donde necesites operar.
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.img}></div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};