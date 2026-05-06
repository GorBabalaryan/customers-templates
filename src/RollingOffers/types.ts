export interface Offer {
  id: string
  name: string
  imageUrl: string
  quantity?: number
  badge?: string
}

export type RollingOffersStatus =
  | 'idle'
  | 'processing'
  | 'success'
  | 'reorganizing'
  | 'complete'

export interface RollingOffersProps {
  offers: Offer[]
  subtitle?: string
  titleImageSrc?: string
  onCollect?: (offer: Offer) => void
  onComplete?: () => void
  processingDurationMs?: number
  successDurationMs?: number
  className?: string
}
