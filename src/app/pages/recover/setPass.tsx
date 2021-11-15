import React from 'react'
import { Button, TextField, Paper, Box, Grid, Typography, InputAdornment, useMediaQuery } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/app/store/'
import toast from 'react-hot-toast'
import Loader from '@/app/components/Loader'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Footer, useStyles } from '@/assets/login/recover'
import ErrorAlert from '@/app/components/ErrorAlert';
import Logo from "../../../assets/images/autentia-logo.svg";
import { cleanMessage } from '@/app/store/user/operations'
import { setIsLoading, unsetIsLoading } from '@/app/store/common/operations'

interface Props {
    token: string
}

interface IFormInputs {
    password: string
    confirmPassword: string
}

const SetPassView = () => {
    const classes = useStyles()
    const { token } = useParams<Props>()
    const dispatch = useDispatch()
    const {user, common} = useSelector((state: StoreState) => state)
    const { isLoggedIn, isLoading, errorMessage } = common

    console.log(token)

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const { register, formState: {errors}, handleSubmit, setError, resetField } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        dispatch(setIsLoading())
        const { password, confirmPassword } = data

        if (!password.trim().length) {
            setError("password", { type: 'manual' }, { shouldFocus: true })
        } else if (!confirmPassword.trim().length) {
            setError("confirmPassword", { type: 'manual' }, { shouldFocus: true })
        } else {
            setTimeout(() => {
                dispatch(unsetIsLoading())
            }, 5000)
        }
    }

    return(
        <Grid container component="main">
            <motion.div 
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <Grid container spacing={2} style={{height: '100vh'}}>
                    <Grid item xs={12} sm={6} md={4} component={Paper} elevation={0} square>
                        <motion.div variants={item}>
                            <AutentiaTitle />
                        </motion.div>
                        <Grid item xs>
                            <motion.div variants={item}>
                                <form>
                                    <Grid container direction="column" spacing={2}>
                                        <TextField />
                                        <TextField />
                                        { isLoading ? <Loader /> : 
                                            <Button className={classes.submit} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" >
                                                Recuperar
                                            </Button>
                                        }
                                    </Grid>
                                    <Grid item xs>
                                        <Link to="/login">
                                            <Typography variant="subtitle2" color="secondary">Iniciar sesión</Typography>
                                        </Link>
                                    </Grid>
                                </form>
                            </motion.div>
                        </Grid>
                        <Footer>
                            <motion.div variants={item}>
                                <FooterContent />
                            </motion.div>
                        </Footer>
                    </Grid>
                </Grid>
            </motion.div>
            { errorMessage && <ErrorAlert open={ !!errorMessage } message={ errorMessage } /> }
        </Grid>
    )
}

const AutentiaTitle = (mobile: any) => (
    <Grid item xs >
        <Box>
            <Typography variant="h3">Autentia</Typography>
            <Typography variant="h3" color="primary">Manager</Typography>
        </Box>
        <Box mt={mobile ? 4 : 7} mb={mobile ? 4 : 9}>
            <Typography variant="h5">Ingresar nueva contraseña</Typography>
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

export default SetPassView