import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { loginRequest, setErrorMessage } from "../../store/common/operations";
import { Redirect } from "react-router";
import { useToasts } from "react-toast-notifications";
import { 
  CssBaseline,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  InputAdornment,
  useMediaQuery
} from '@material-ui/core';
import { Fingerprint, VpnKey } from "@material-ui/icons";
import Logo from "../../../assets/images/autentia-logo.svg";
import { BGStyled, FooterStyled, LoginImageStyled2, LoginImageStyled1, useStyles } from "../../../assets/login";
import ErrorAlert from "../../components/ErrorAlert";

const Login = () => {
  const classes = useStyles();
  const viewMobile = useMediaQuery('(max-width:768px)'); // mobile
  const viewTablet = useMediaQuery('(max-width:959px)'); // tablet

  const dispatch = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { errorMessage, isLoggedIn } = common;
  const { addToast } = useToasts();
  
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = (e: any, dni: string, password: string) => {
    e.preventDefault();
    if (dni.trim().length !== 0 && password.trim().length !== 0) {
      dispatch(loginRequest(dni, password));
    } else {
      let message = "Favor rellenar todos los campos";
      addToast(message, { appearance: 'warning', autoDismiss: true });
    };
  };

  useEffect(() => {
    (errorMessage) && dispatch(setErrorMessage(errorMessage));
  }, [errorMessage, dispatch]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  };

  function Copyright() {
    return (
      <>
        <Typography variant="body2" color="textSecondary">
          <Link color="inherit" href="https://www.autentia.cl/">
            <img src={Logo} alt="logo" />
          </Link>{' '}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </>
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs>
              <Typography variant="h3">Autentia</Typography>
              <Typography variant="h3" color="primary">Manager</Typography>
            </Grid>
          </Grid>
          <Box mt={viewMobile ? 4 : 7} mb={viewMobile ? 4 : 9}>
            <Grid item xs>
              <Typography variant="h5">Ingresar</Typography>
            </Grid>
          </Box>
          <form className={classes.form} noValidate>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="DNI"
                  helperText="Ingresar DNI"
                  onChange={({ target: {value} }) => setDni(value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Fingerprint />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Contraseña"
                  type="password"
                  helperText="Ingresar contraseña"
                  onChange={({ target: {value} }) => setPassword(value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => handleOnSubmit(e, dni, password) }
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
          <FooterStyled>
            <Copyright /> 
          </FooterStyled>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8}>
        <BGStyled>
          {viewTablet ? <LoginImageStyled2 /> : <LoginImageStyled1 />}
        </BGStyled>
      </Grid>
      <ErrorAlert open={ !!errorMessage } message={ errorMessage } />
    </Grid>
  );
};

export default Login;
