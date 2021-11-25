import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { loginRequest, setErrorMessage } from "../../store/common/operations";
import { Redirect } from "react-router";
import { Button, TextField, Paper, Box, Grid, Typography, InputAdornment, useMediaQuery } from '@material-ui/core';
import { Fingerprint, VpnKey } from "@material-ui/icons";
import Logo from "../../../assets/images/autentia-logo.svg";
import { useStyles, Footer } from "../../../assets/login";
import ErrorAlert from "../../components/ErrorAlert";
import LoginImage from "@/assets/images/img-login.svg";
import LoginImagePlus from "@/assets/images/img-login-2.svg";
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { DniReg } from '@/app/helper/Regex'
import { motion } from 'framer-motion'
import { MotionRightContainer, MotionRightItem } from '@/app/components/Motion'

interface IFormInputs {
    dni: string
    password: string
}

const Login = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { common } = useSelector((state: StoreState) => state)
    const { errorMessage, isLoggedIn } = common;
    const viewMobile = useMediaQuery('(max-width:425px)'); // mobile
    const viewTablet = useMediaQuery('(max-width:959px)'); // tablet

    const { register, formState: {errors}, handleSubmit, setError } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const {dni, password} = data

        if (!dni.trim().length) {
            setError("dni", { type: 'manual' }, { shouldFocus: true })
        } else if (!password.trim().length) {
            setError("password", { type: 'manual' }, { shouldFocus: true })
        } else {
            dispatch(loginRequest(dni.toUpperCase(), password))
        }
    }

    useEffect(() => {
        (errorMessage) && dispatch(setErrorMessage(errorMessage));
    }, [errorMessage, dispatch]);

    if (isLoggedIn) {
        return <Redirect to="/" />;
    };

    return (
        <Grid container component="main" className={classes.root}>
            <MotionRightContainer>
            <Grid container spacing={2} style={{height: '100vh'}}>
                <Grid item xs={12} sm={6} md={4} component={Paper} elevation={0} square>
                    <div className={classes.paper}>
                        <MotionRightItem>
                            <AutentiaTitle />
                        </MotionRightItem>
                        <Grid item xs>
                            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                                <MotionRightItem>
                                    <Grid container direction="column" spacing={2}>
                                        <TextField
                                            margin="dense"
                                            id="dni"
                                            label="Rut / Dni"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                <Fingerprint />
                                                </InputAdornment>
                                                ),
                                            }}
                                            { ...register("dni", {required: true, maxLength: 11, pattern: DniReg}) }
                                            error={errors.dni ? true : false}
                                            helperText={errors.dni ? "Debe ingresar un Dni o Rut válido" : "Ingresar Dni"}
                                        />
                                        
                                        <TextField
                                            margin="dense"
                                            id="password"
                                            label="Contraseña"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <VpnKey />
                                                </InputAdornment>
                                                ),
                                            }}
                                            { ...register("password", { required: true }) }
                                            error={errors.password ? true : false}
                                            helperText={errors.password ? "Debe ingresar una Contraseña válida" : "Ingresar contraseña"}
                                        />
                                        <Button className={classes.submit} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" >
                                            Ingresar
                                        </Button>

                                        <Grid item xs>
                                            <Link to="/recover">
                                                <Typography variant="subtitle2" color="secondary">¿Olvido su contraseña?</Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </MotionRightItem>
                            </form>
                        </Grid>
                        <Footer>
                            <MotionRightItem>
                                <FooterContent />
                            </MotionRightItem>
                        </Footer>
                    </div>
                </Grid>
                { !viewMobile && 
                    <Grid item sm={6} md={8} className={classes.bg}>
                        { viewTablet ? 
                            <img src={LoginImagePlus} alt="AutentiaLogo" className={classes.img} /> : 
                            <img src={LoginImage} alt="AutentiaLogo" className={classes.img} /> }   
                    </Grid>
                }
            </Grid>
            </MotionRightContainer>
            { errorMessage && <ErrorAlert open={ !!errorMessage } message={ errorMessage } /> }            
        </Grid>
    );
};

const AutentiaTitle = (mobile: any) => (
    <Grid item xs>
        <Box>
            <Typography variant="h3">Autentia</Typography>
            <Typography variant="h3" color="primary">Manager</Typography>
        </Box>
        <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
            <Typography variant="h5">Ingresar</Typography>
        </Box>
    </Grid>
)



const FooterContent = () => (
    <Grid item xs>
        <Typography variant="body2" color="textSecondary">
            <img src={Logo} alt="logo" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </Grid>
)

export default Login;
