import React from 'react'
import { motion } from 'framer-motion'

export const MotionContainer = ({ children }: any) => {
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

    return (
        <motion.div variants={container} initial="hidden" animate="visible" >
            {children}
        </motion.div>
    )
}

export const MotionItemUp = ({children}: any) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return(
        <motion.div variants={item}>
            {children}
        </motion.div>
    )
}

export const MotionRightContainer = ({children}: any) => {
    const container = {
        hidden: { x: -10, opacity: 0 },
        visible: {
            x: 0, 
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0,
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    return (
        <motion.div variants={container} initial="hidden" animate="visible">
            {children}
        </motion.div>
    )
}

export const MotionRightItem = ({children}: any) => {
    const item = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    return <motion.div variants={item}>{children}</motion.div>
}

export const MotionLeftContainer = ({children}: any) => {
    const container = {
        hidden: { x: 10, opacity: 0 },
        visible: {
            x: 0, 
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0,
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    return (
        <motion.div variants={container} initial="hidden" animate="visible">
            {children}
        </motion.div>
    )
}

export const MotionLeftItem = ({children}: any) => {
    const item = {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    return <motion.div variants={item}>{children}</motion.div>
}