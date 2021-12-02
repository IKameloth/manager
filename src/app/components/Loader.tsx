import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export default function CircularLoader() {
    return (
        <Box mt={3}>
            <CircularProgress color="secondary" />
        </Box>
    )
}
