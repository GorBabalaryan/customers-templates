'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import type { Offer, RollingOffersProps, RollingOffersStatus } from './types'
import { OfferTile } from './components/OfferTile'
import { ProcessingOverlay } from './components/ProcessingOverlay'
import { SuccessScreen } from './components/SuccessScreen'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ROLLING_OFFER_TITLE_DESKTOP_SRC,
  ROLLING_OFFER_TITLE_MOBILE_SRC,
} from './components/icons'
import './styles/tokens.css'
import './RollingOffers.css'

const DEFAULT_PROCESSING_MS = 1200
const DEFAULT_SUCCESS_MS = 1500
const SUCCESS_EXIT_MS = 480
const REORGANIZE_MS = 600

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const

const APPLE_SPRING = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 22,
  mass: 0.85,
  restDelta: 0.0005,
  restSpeed: 0.0005,
}

const LAYOUT_TRANSITION = {
  layout: APPLE_SPRING,
  opacity: { duration: 0.4, ease: 'easeOut' as const },
  scale: { duration: 0.5, ease: SMOOTH_EASE },
}

const CHEVRON_TRANSITION = {
  layout: APPLE_SPRING,
  opacity: { duration: 0.3, ease: 'easeOut' as const },
}

export function RollingOffers({
  offers,
  subtitle = 'Ends in 22:22:22',
  titleImageSrc,
  onCollect,
  onComplete,
  processingDurationMs = DEFAULT_PROCESSING_MS,
  successDurationMs = DEFAULT_SUCCESS_MS,
  className,
}: RollingOffersProps) {
  const [queue, setQueue] = useState<Offer[]>(offers)
  const [collectedOffer, setCollectedOffer] = useState<Offer | null>(null)
  const [status, setStatus] = useState<RollingOffersStatus>(
    offers.length === 0 ? 'complete' : 'idle',
  )
  const timersRef = useRef<number[]>([])
  const completeFiredRef = useRef(false)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  const scheduleTimer = useCallback((cb: () => void, ms: number) => {
    const id = window.setTimeout(cb, ms)
    timersRef.current.push(id)
    return id
  }, [])

  useEffect(() => {
    setQueue(offers)
    setCollectedOffer(null)
    completeFiredRef.current = false
    setStatus(offers.length === 0 ? 'complete' : 'idle')
    clearTimers()
  }, [offers, clearTimers])

  useEffect(() => {
    return clearTimers
  }, [clearTimers])

  const activeOffer = queue[0]

  const handleCollect = useCallback(() => {
    if (status !== 'idle' || !activeOffer) return
    const collected = activeOffer

    setStatus('processing')

    scheduleTimer(() => {
      setCollectedOffer(collected)
      setStatus('success')

      scheduleTimer(() => {
        setCollectedOffer(null)

        scheduleTimer(() => {
          onCollect?.(collected)
          setQueue((prev) => prev.slice(1))
          setStatus('reorganizing')

          scheduleTimer(() => {
            setStatus('idle')
          }, REORGANIZE_MS)
        }, SUCCESS_EXIT_MS)
      }, successDurationMs)
    }, processingDurationMs)
  }, [activeOffer, onCollect, processingDurationMs, scheduleTimer, status, successDurationMs])

  useEffect(() => {
    if (
      queue.length === 0 &&
      status !== 'complete' &&
      collectedOffer === null &&
      !completeFiredRef.current
    ) {
      completeFiredRef.current = true
      setStatus('complete')
      onComplete?.()
    }
  }, [queue.length, status, collectedOffer, onComplete])

  return (
    <div
      className={['ct-rolling-offers', className ? className : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ct-rolling-offers__title">
        {titleImageSrc ? (
          <img
            src={titleImageSrc}
            alt="Rolling Offer"
            className="ct-rolling-offers__title-image"
            draggable={false}
          />
        ) : (
          <picture>
            <source
              srcSet={ROLLING_OFFER_TITLE_MOBILE_SRC}
              media="(max-width: 767px)"
            />
            <img
              src={ROLLING_OFFER_TITLE_DESKTOP_SRC}
              alt="Rolling Offer"
              className="ct-rolling-offers__title-image"
              draggable={false}
            />
          </picture>
        )}
      </div>

      <div className="ct-rolling-offers__panel">
        <p className="ct-rolling-offers__subtitle">{subtitle}</p>

        {queue.length === 0 && collectedOffer === null ? (
          <p className="ct-rolling-offers__empty">All offers collected!</p>
        ) : (
          <LayoutGroup id="rolling-offers">
            <motion.div className="ct-rolling-offers__row" layout>
              <AnimatePresence initial={false} mode="popLayout">
                {queue.map((offer, index) => {
                  const isActive = index === 0 && status === 'idle'
                  const isLastInPair = index % 2 === 0
                  const isLastTile = index === queue.length - 1

                  return (
                    <Fragment key={offer.id}>
                      <motion.div
                        className="ct-rolling-offers__cell"
                        layout
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.05 },
                        }}
                        transition={LAYOUT_TRANSITION}
                      >
                        <OfferTile
                          offer={offer}
                          active={isActive}
                          onClick={isActive ? handleCollect : undefined}
                        />
                      </motion.div>

                      {!isLastTile && (
                        <motion.span
                          key={`sep-${offer.id}`}
                          className={
                            isLastInPair
                              ? 'ct-rolling-offers__chevron ct-rolling-offers__chevron--h'
                              : 'ct-rolling-offers__chevron ct-rolling-offers__chevron--v'
                          }
                          layout="position"
                          aria-hidden="true"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.05 } }}
                          transition={CHEVRON_TRANSITION}
                        >
                          <ChevronRightIcon className="ct-rolling-offers__chevron-h-icon" />
                          <ChevronDownIcon className="ct-rolling-offers__chevron-v-icon" />
                        </motion.span>
                      )}
                    </Fragment>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}

        <AnimatePresence>
          {status === 'processing' && <ProcessingOverlay key="proc" />}
          {collectedOffer && (
            <SuccessScreen
              key={`succ-${collectedOffer.id}`}
              offer={collectedOffer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
