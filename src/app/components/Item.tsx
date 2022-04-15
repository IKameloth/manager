import React, { ReactNode } from 'react'
import { Paper, styled } from '@mui/material';
import { motion } from 'framer-motion'

const ItemStyled = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: 900,
    color: theme.palette.text.secondary,
    borderRadius: 10,
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)'
}));

interface ItemProp {
    children: ReactNode
    delay?: number
}

export const Item = ({ children, delay = 0 }: ItemProp) => (
    <ItemStyled>
        <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay }}
        >
            {children}
        </motion.div>
    </ItemStyled>
)