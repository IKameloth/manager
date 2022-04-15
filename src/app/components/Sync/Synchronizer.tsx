import React, { useEffect, useState, useRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, Typography } from "@mui/material";
import { MotionItemUp } from '../Motion';
import Loader from '../Loader';

interface SyncProps {
    isOpen: boolean
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 10
    },
}));

const Synchronize = (props: SyncProps) => {
    const [open, setOpen] = useState(false)
    const statusMessage = useRef('')

    useEffect(() => {
        if (props.isOpen) {
            setOpen(true)
            statusMessage.current = 'Sincronizando'
        } else {
            setOpen(false)
        }
    }, [])

    const onClose = () => {
        setOpen(!open)
    }

    return(
        <>
            <StyledDialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: 250 }}>
                    <DialogTitle>
                        <Typography component="span" variant="h6" style={{fontSize: 18}}>
                            Sincronizacion
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <MotionItemUp>
                            <Loader />
                        </MotionItemUp>
                        <MotionItemUp>
                            <Typography variant="subtitle1" color="primary">
                                { statusMessage.current }
                            </Typography>
                        </MotionItemUp>
                    </DialogContent>
                    <DialogActions style={{justifyContent: 'center'}}>
                        <Button onClick={onClose} autoFocus>Cerrar</Button>
                    </DialogActions>
                </div>

            </StyledDialog>
        </>
    )
}

export default Synchronize