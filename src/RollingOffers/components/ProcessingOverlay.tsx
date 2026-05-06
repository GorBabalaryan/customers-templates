'use client'

import { motion } from 'framer-motion'
import './ProcessingOverlay.css'

export function ProcessingOverlay() {
  return (
    <motion.div
      className="ct-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
    >
      <div className="ct-overlay__center">
        <motion.span
          className="ct-overlay__spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.span
          className="ct-overlay__label"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.2 }}
        >
          Processing
        </motion.span>
      </div>
    </motion.div>
  )
}
