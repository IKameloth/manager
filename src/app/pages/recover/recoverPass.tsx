import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { Redirect } from "react-router";
import { Button, TextField, Paper, Box, Grid, Typography, InputAdornment, useMediaQuery } from '@material-ui/core';
import Logo from "../../../assets/images/autentia-logo.svg";
import { useStyles, Footer } from "../../../assets/login/recover";
import ErrorAlert from "../../components/ErrorAlert";
import LoginImage from "@/assets/images/img-login.svg";
import LoginImagePlus from "@/assets/images/img-login-2.svg";
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { DniReg } from '@/app/helper/Regex'
import { Fingerprint } from "@material-ui/icons";
import { motion } from 'framer-motion'
import { cleanMessage, recoverPassword } from '@/app/store/user/operations'
import { setIsLoading, unsetIsLoading } from '@/app/store/common/operations'
import toast from 'react-hot-toast'
import Loader from "@/app/components/Loader";

interface IFormInputs {
    dni: string
}

const RecoverPass = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { common, user } = useSelector((state: StoreState) => state)
    const { errorMessage, message } = user
    const { isLoggedIn, isLoading } = common
    const viewMobile = useMediaQuery('(max-width:425px)'); // mobile
    const viewTablet = useMediaQuery('(max-width:959px)'); // tablet

    const { register, formState: {errors}, handleSubmit, setError, resetField } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        dispatch(setIsLoading())
        const { dni } = data

        if (!dni.trim().length) {
            setError("dni", { type: 'manual' }, { shouldFocus: true })
        } else {
            dispatch(recoverPassword(dni))
            setTimeout(() => {
                dispatch(unsetIsLoading())
                resetField('dni')
            }, 7000)
        }
    }

    useEffect(() => {
        if (errorMessage.length === 0)
            message.length > 0 && toast.success(message, { duration: 7000 }) && dispatch(cleanMessage())
    }, [message])

    useEffect(() => {
        (errorMessage.length > 0) && errorMessage
    }, [errorMessage]);

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
                                        autoFocus
                                        margin="dense"
                                        id="dni"
                                        label="Dni"
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
                                        { ...register("dni", { required: true, pattern: DniReg }) }
                                        error={errors.dni ? true : false}
                                        helperText={errors.dni ? "Debe ingresar un Dni válido" : "Ingresar Dni"}
                                    />
                                    { isLoading ? <Loader /> : 
                                        <Button className={classes.submit} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" >
                                            Recuperar
                                        </Button>
                                    }

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
