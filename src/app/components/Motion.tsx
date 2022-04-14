import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ParentElement {
    children: ReactNode
}

export const MotionContainer = ({ children }: ParentElement) => {
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

export const MotionItemUp = ({children}: ParentElement) => {
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

export const MotionRightContainer = ({children}: ParentElement) => {
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

export const MotionRightItem = ({children}: ParentElement) => {
    const item = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    return <motion.div variants={item}>{children}</motion.div>
}

export const MotionLeftContainer = ({children}: ParentElement) => {
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

export const MotionLeftItem = ({children}: ParentElement) => {
    const item = {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    return <motion.div variants={item}>{children}</motion.div>
}