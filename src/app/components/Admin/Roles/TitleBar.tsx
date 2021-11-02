import React from 'react'
import { Button, Grid, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles( theme => ({
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 900,
        flexGrow: 1,
        borderRadius: 10,
        boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)'
    },
    title: {
        color: '#000000',
        textTransform: 'capitalize'
    },
    subTitle: {
        marginTop: 6,
        textTransform: 'capitalize'
    }
}))

interface Props {
    title: string
    subTitle: string
    btnText: string
    btnAction: () => void
}

const TitleBar = (props: Props) => {
    const { title, subTitle, btnText, btnAction } = props
    const classes = useStyles()
    const viewMobile = useMediaQuery('(max-width:425px)');
    return(
        <Grid item xs={12} md={12}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container alignItems="center" justifyContent="center" style={{margin: '9px 25px'}}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h4" className={classes.title}>{title}</Typography>
                                <Typography variant="body1" className={classes.subTitle}>{subTitle}.</Typography>
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginTop: viewMobile ? '10px' : '0px' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                startIcon={<AddIcon />} 
                                style={{ borderRadius: 20 }}
                                onClick={btnAction}
                            >{btnText}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default TitleBar