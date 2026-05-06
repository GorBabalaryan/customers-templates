import type { SVGProps } from 'react'
import rollingOfferTitleDesktopUrl from '../assets/rolling-offer-title-desktop.png'
import rollingOfferTitleMobileUrl from '../assets/rolling-offer-title-mobile.png'
import lockIconUrl from '../assets/lock-20359a.png'

export const ROLLING_OFFER_TITLE_DESKTOP_SRC = rollingOfferTitleDesktopUrl
export const ROLLING_OFFER_TITLE_MOBILE_SRC = rollingOfferTitleMobileUrl
export const LOCK_ICON_SRC = lockIconUrl

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BurstRays(props: SVGProps<SVGSVGElement>) {
  const rays = Array.from({ length: 12 }, (_, i) => i)
  return (
    <svg
      width="320"
      height="320"
      viewBox="-160 -160 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="ct-ray-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE78A" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFC736" stopOpacity="0" />
        </linearGradient>
      </defs>
      {rays.map((i) => (
        <polygon
          key={i}
          points="0,-150 12,-50 -12,-50"
          fill="url(#ct-ray-grad)"
          transform={`rotate(${(360 / rays.length) * i})`}
        />
      ))}
    </svg>
  )
}
