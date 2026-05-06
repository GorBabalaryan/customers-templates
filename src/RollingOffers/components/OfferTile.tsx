'use client'

import { motion } from 'framer-motion'
import type { Offer } from '../types'
import { LockIcon } from './icons'
import './OfferTile.css'

export interface OfferTileProps {
  offer: Offer
  active: boolean
  onClick?: () => void
}

export function OfferTile({ offer, active, onClick }: OfferTileProps) {
  const isInteractive = active && Boolean(onClick)

  return (
    <motion.button
      type="button"
      className={`ct-tile ${active ? 'ct-tile--active' : 'ct-tile--locked'}`}
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      aria-label={active ? `Collect ${offer.name}` : `${offer.name} (locked)`}
      animate={
        active
          ? { y: [0, -3, 0], scale: [1, 1.025, 1] }
          : { y: 0, scale: 1 }
      }
      transition={
        active
          ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.2 }
      }
      whileTap={isInteractive ? { scale: 0.96 } : undefined}
      whileHover={isInteractive ? { scale: 1.04 } : undefined}
    >
      {offer.badge && <span className="ct-tile__badge">{offer.badge}</span>}

      <div className="ct-tile__image-area">
        <img
          src={offer.imageUrl}
          alt=""
          className="ct-tile__image"
          draggable={false}
        />
        {typeof offer.quantity === 'number' && (
          <span className="ct-tile__quantity">×{offer.quantity}</span>
        )}
      </div>

      <div className="ct-tile__button">
        <div className="ct-tile__button-inner">
          {active ? (
            <span className="ct-tile__free">FREE</span>
          ) : (
            <>
              <LockIcon className="ct-tile__lock" />
              <span className="ct-tile__free">FREE</span>
            </>
          )}
        </div>
      </div>

      {active && <span className="ct-tile__glow" aria-hidden="true" />}
    </motion.button>
  )
}
