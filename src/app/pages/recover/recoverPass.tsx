import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { setErrorMessage } from "../../store/common/operations";
import { Redirect } from "react-router";
import { Button, TextField, Paper, Box, Grid, Typography, InputAdornment, useMediaQuery } from '@material-ui/core';
import Logo from "../../../assets/images/autentia-logo.svg";
import { useStyles, Footer } from "../../../assets/login/recover";
import ErrorAlert from "../../components/ErrorAlert";
import LoginImage from "@/assets/images/img-login.svg";
import LoginImagePlus from "@/assets/images/img-login-2.svg";
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { EmailReg } from '@/app/helper/Regex'
import EmailIcon from '@material-ui/icons/Email';
import { motion } from 'framer-motion'

interface IFormInputs {
    email: string
}

const RecoverPass = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { common } = useSelector((state: StoreState) => state)
    const { errorMessage, isLoggedIn } = common;
    const viewMobile = useMediaQuery('(max-width:425px)'); // mobile
    const viewTablet = useMediaQuery('(max-width:959px)'); // tablet

    const { register, formState: {errors}, handleSubmit, setError } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const { email } = data

        if (!email.trim().length) {
            setError("email", { type: 'manual' }, { shouldFocus: true })
        } else {
            // dispatch
            alert("Incoming!")
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
            <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0 }}
            >
            <Grid container spacing={2} style={{height: '100vh'}}>
                { !viewMobile && 
                    <Grid item sm={6} md={8} className={classes.bg}>
                        { viewTablet ? 
                            <img src={LoginImagePlus} alt="AutentiaLogo" className={classes.img} /> : 
                            <img src={LoginImage} alt="AutentiaLogo" className={classes.img} /> }   
                    </Grid>
                }
                <Grid item xs={12} sm={6} md={4} component={Paper} elevation={0} square>
                    <div className={classes.paper}>
                        <AutentiaTitle />
                        <Grid item xs>
                            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                                <Grid container direction="column" spacing={2}>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Email"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <EmailIcon />
                                            </InputAdornment>
                                            ),
                                        }}
                                        { ...register("email", { required: true, pattern: EmailReg }) }
                                        error={errors.email ? true : false}
                                        helperText={errors.email ? "Debe ingresar un Email válido" : "Ingresar Email"}
                                    />
                                    <Button className={classes.submit} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" >
                                        Recuperar
                                    </Button>

                                    <Grid item xs>
                                        <Link to="/login">
                                            <Typography variant="subtitle2" color="secondary">Iniciar sesión</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Footer>
                            <FooterContent />
                        </Footer>
                    </div>
                </Grid>
            </Grid>
            </motion.div>
            { errorMessage && <ErrorAlert open={ !!errorMessage } message={ errorMessage } /> }            
        </Grid>
    );
};

const AutentiaTitle = (mobile: any) => (
    <Grid item xs >
        <Box>
            <Typography variant="h3">Autentia</Typography>
            <Typography variant="h3" color="primary">Manager</Typography>
        </Box>
        <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
            <Typography variant="h5">Recuperar Contraseña</Typography>
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

export default RecoverPass;
