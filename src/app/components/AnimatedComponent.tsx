import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  children: JSX.Element;
}

const AnimatedComponent = ({ children }: Props) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-2vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "2vw",
      transition: {
        delay: 5
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}
    >
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </motion.div>
  )
}

export default AnimatedComponent
