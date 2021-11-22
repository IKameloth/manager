import React, { useEffect, useState, useRef } from 'react'
import { Paper, Box, Grid, Typography, useMediaQuery, Button } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/app/store/'
import Loader from '@/app/components/Loader'
import { validateToken } from "@/app/store/user";
import Img from '@/assets/images/frame.svg'
import ImgPlus from '@/assets/images/frameplus.svg'
import { MotionContainer, MotionItemUp } from '@/app/components/Motion'
import { makeStyles } from '@material-ui/core/styles';
import { setIsLoading, unsetIsLoading } from '@/app/store/common';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SetPassView from './setPass';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: "#F7F9FC"
    },
    bg: {
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    subtitle: {
        marginTop: '3%'
    },
    submit: {
        borderRadius: 200,
        margin: theme.spacing(3, 0, 2),
    },
}))

interface Props {
    token: string
}

const TokenValidation = () => {
    const viewMobile = useMediaQuery('(max-width:425px)'); // mobile
    const classes = useStyles()
    const { token } = useParams<Props>()
    const dispatch = useDispatch()
    const commonState = useSelector((state: StoreState) => state.common)
    const { isLoggedIn, isLoading } = commonState
    const [statusToken, setStatusToken] = useState<any>(null)
    const status = useRef("Validando...")
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setIsLoading())
        async function ValidateToken() {
            let res = await dispatch(validateToken(token))
            setStatusToken(res)
        }
        ValidateToken()
        dispatch(unsetIsLoading())
    }, [])

    useEffect(() => {
        if (statusToken?.status === 200) {
            setIsSuccess(true)
            status.current = "Validación Completa!"
        } else {
            setIsSuccess(false)
            status.current = "Validación Fallida, token expirado o inválido!"
        }
    }, [statusToken])
    
    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return(
        <MotionContainer>
            <Grid container component="main" className={classes.root} >
                <Grid container spacing={2} style={{height: '100vh'}}>
                    { !viewMobile && 
                        <Grid item sm={3} md={3} className={classes.bg}>
                            <img src={ImgPlus} alt="AutentiaLogo" className={classes.img} />
                        </Grid>
                    }
                    <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
                        { isLoading &&
                            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                                <MotionItemUp>
                                    <Loader />
                                </MotionItemUp>
                                <MotionItemUp>
                                    <Typography variant="subtitle1" color="primary" className={classes.subtitle}>{status.current}</Typography>
                                </MotionItemUp>
                            </Box>
                        }
                        { !isLoading && !isSuccess &&
                            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                                <MotionItemUp>
                                    <ErrorOutlineIcon style={{ width: 200, height: 200, color: '#FF0000' }} />
                                </MotionItemUp>
                                <MotionItemUp>
                                    <Typography variant="subtitle1" color="error" className={classes.subtitle}>{status.current}</Typography>
                                </MotionItemUp>
                                <MotionItemUp>
                                    <Link to="/" >
                                        <Button className={classes.submit} style={{color: '#FF0000'}} type="button">Volver</Button>
                                    </Link>
                                </MotionItemUp>
                            </Box>
                        }
                        { !isLoading && isSuccess &&
                            <SetPassView token={token} />
                        }
                    </Grid>
                    { !viewMobile &&
                        <Grid item sm={3} md={3} className={classes.bg}>
                            <img src={Img} alt="AutentiaLogo" className={classes.img} />
                        </Grid>
                    }
                </Grid>
            </Grid>
        </MotionContainer>
    )
}

export default TokenValidation