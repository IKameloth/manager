import React, { useState, useEffect, useCallback } from 'react'
import { Button, TextField, Paper, Box, Grid, Typography, InputAdornment, useMediaQuery } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/app/store/'
import toast from 'react-hot-toast'
import Loader from '@/app/components/Loader'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Footer, useStyles } from '@/assets/login/recover'
import ErrorAlert from '@/app/components/ErrorAlert'
import Logo from "../../../assets/images/autentia-logo.svg"
import { validateToken, cleanMessage } from "@/app/store/user";
import { setIsLoading, unsetIsLoading } from '@/app/store/common/operations'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import Img from '@/assets/images/frame.svg'
import ImgPlus from '@/assets/images/frameplus.svg'
import HandImg from '@/assets/images/hand.svg'
import { MotionContainer, MotionItemUp } from '@/app/components/Motion'

interface Props {
    token: string
}

interface IFormInputs {
    password: string
    confirmPassword: string
}

const SetPassView = () => {
    const viewMobile = useMediaQuery('(max-width:425px)'); // mobile
    const classes = useStyles()
    const { token } = useParams<Props>()
    const dispatch = useDispatch()
    const commonState = useSelector((state: StoreState) => state.common)
    const userState = useSelector((state: StoreState) => state.user)
    const { isLoggedIn, isLoading, errorMessage } = commonState
    const { message } = userState
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [isOk, setIsOk] = useState(false)

    // const caller = useCallback(async () => {
    //     console.log("CALLBACK")
    //     await dispatch(cleanMessage())
    //     await dispatch(validateToken(token))
    // }, [])
    
    // useEffect(() => {
    //     console.log("EFFECT 1")
    //     caller()
    // }, [])
    
    // useEffect(() => {
    //     console.log("EFFECT 2")
    //     message === '200' && setIsOk(true)
    // }, [message])

    // if (isLoggedIn || (!isOk && message === '404')) {
    //     dispatch(cleanMessage())
    //     toast.error("Token obsoleto o invalido", { duration: 7000 })
    //     return <Redirect to="/" />
    // }

    const { register, formState: {errors}, handleSubmit, setError, resetField } = useForm<IFormInputs>()

    const onSubmit: SubmitHandler<IFormInputs> = async data => {
        dispatch(setIsLoading())
        const { password, confirmPassword } = data
        
        if (!password.trim().length) {
            setError("password", { type: 'required', message: 'El campo no puede ir vacío' }, { shouldFocus: true })
        } else if (!confirmPassword.trim().length) {
            setError("confirmPassword", { type: 'required', message: 'El campo no puede ir vacío' }, { shouldFocus: true })
        } else if (password.trim() !== confirmPassword.trim()) {
            setError("confirmPassword", { type: 'required', message: 'Las contraseñas deben coincidir' })
        } else {
            console.log(data)
            // await dispatch(updateUser(password)) // se necesita el user
        }
        dispatch(unsetIsLoading())
    }

    const handleShowPass = () => setShowPass(!showPass)
    const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass)

    return(
        <Grid container component="main" className={classes.root} >
            <MotionContainer>
                <Grid container spacing={2} style={{height: '100vh'}}>
                    { !viewMobile && 
                        <Grid item sm={3} md={3} className={classes.bg}>
                            <img src={ImgPlus} alt="AutentiaLogo" className={classes.img} />
                        </Grid>
                    }
                    <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
                        <div className={classes.paper}>
                        <MotionItemUp>
                            <AutentiaTitle />
                        </MotionItemUp>
                        <Grid item xs>
                            <MotionItemUp>
                                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                                    <Grid container direction="column" spacing={2}>
                                        <TextField 
                                            autoFocus
                                            fullWidth
                                            margin="dense"
                                            id="password"
                                            label="Contraseña"
                                            type={ showPass ? "text" : "password" }
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" onClick={handleShowPass}>
                                                        { showPass ? <VisibilityOff /> : <Visibility /> }
                                                    </InputAdornment>
                                                )
                                            }}
                                            { ...register("password", { required: 'Debe ingresar una contraseña válida' }) }
                                            error={errors.password ? true : false}
                                            helperText={errors.password ? errors.password.message : "Ingresar nueva contraseña"}
                                        />
                                        <TextField 
                                            fullWidth
                                            margin="dense"
                                            id="confirmPassword"
                                            label="Confirmar contraseña"
                                            type={ showConfirmPass ? "text" : "password" }
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" onClick={handleShowConfirmPass}>
                                                        { showConfirmPass ? <VisibilityOff /> : <Visibility /> }
                                                    </InputAdornment>
                                                )
                                            }}
                                            { ...register("confirmPassword", { required: 'Debe ingresar una contraseña válida' }) }
                                            error={errors.confirmPassword ? true : false}
                                            helperText={errors.confirmPassword ? errors.confirmPassword.message : "Confirmar nueva contraseña"}
                                        />
                                        { isLoading ? <Loader /> : 
                                            <Button className={classes.submit} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" >
                                                OK
                                            </Button>
                                        }
                                        <Box mt={2}>
                                            <Link to="/login">
                                                <Typography variant="subtitle2" color="secondary">Iniciar sesión</Typography>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </form>
                            </MotionItemUp>
                        </Grid>
                        { viewMobile &&
                            <Grid item xs>
                                <img src={HandImg} alt="AutentiaLogo" />
                            </Grid>
                        }
                        <Footer>
                            <MotionItemUp>
                                <FooterContent />
                            </MotionItemUp>
                        </Footer>
                        </div>
                    </Grid>
                    { !viewMobile &&
                        <Grid item sm={3} md={3} className={classes.bg}>
                            <img src={Img} alt="AutentiaLogo" className={classes.img} />
                        </Grid>
                    }
                </Grid>
            </MotionContainer>
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