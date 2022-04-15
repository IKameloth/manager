import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ItemProp {
    children: ReactNode
    delay?: number
}

const Section = ({ children, delay = 0 }: ItemProp) => (
    <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay }}
    >
        {children}
    </motion.div>
)

export default Section