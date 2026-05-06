'use client'

import { motion } from 'framer-motion'
import type { Offer } from '../types'
import { BurstRays } from './icons'
import './SuccessScreen.css'

export interface SuccessScreenProps {
  offer: Offer
}

export function SuccessScreen({ offer }: SuccessScreenProps) {
  const particles = Array.from({ length: 12 }, (_, i) => i)

  return (
    <motion.div
      className="ct-success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.55, ease: 'easeOut', delay: 0.15 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="ct-success__stage">
        <motion.span
          className="ct-success__rays"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          exit={{
            scale: 1.4,
            opacity: 0,
            transition: { duration: 0.45, ease: 'easeOut' },
          }}
          transition={{
            scale: { type: 'spring', stiffness: 180, damping: 16 },
            opacity: { duration: 0.4 },
            rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
          }}
          aria-hidden="true"
        >
          <BurstRays />
        </motion.span>

        <motion.span
          className="ct-success__rays ct-success__rays--counter"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 0.6, rotate: -360 }}
          exit={{
            scale: 1.6,
            opacity: 0,
            transition: { duration: 0.45, ease: 'easeOut' },
          }}
          transition={{
            scale: { type: 'spring', stiffness: 160, damping: 16, delay: 0.05 },
            opacity: { duration: 0.5 },
            rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
          }}
          aria-hidden="true"
        >
          <BurstRays />
        </motion.span>

        <motion.div
          className="ct-success__icon-wrap"
          initial={{ scale: 0, rotate: -8, y: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            y: [0, -4, 0],
          }}
          exit={{
            y: -260,
            scale: 0.45,
            opacity: 0,
            transition: {
              y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.4, ease: [0.4, 0, 1, 1], delay: 0.1 },
            },
          }}
          transition={{
            scale: { type: 'spring', stiffness: 320, damping: 14, mass: 0.7 },
            rotate: { type: 'spring', stiffness: 320, damping: 14 },
            y: {
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.45,
            },
          }}
        >
          <img
            src={offer.imageUrl}
            alt=""
            className="ct-success__icon"
            draggable={false}
          />
        </motion.div>

        {particles.map((i) => {
          const angle = (i / particles.length) * Math.PI * 2
          const distance = 120 + (i % 3) * 22
          return (
            <motion.span
              key={i}
              className="ct-success__particle"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [0, 1, 0],
                scale: [0, 1.1, 0.4],
              }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08 + (i % 4) * 0.04,
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>

      <motion.p
        className="ct-success__caption"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        You got <strong>{offer.name}</strong>
        {typeof offer.quantity === 'number' && <> ×{offer.quantity}</>}!
      </motion.p>
    </motion.div>
  )
}
