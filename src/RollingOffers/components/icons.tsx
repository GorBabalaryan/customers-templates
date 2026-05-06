import type { SVGProps } from 'react'
import rollingOfferTitleDesktopUrl from '../assets/rolling-offer-title-desktop.png'
import rollingOfferTitleMobileUrl from '../assets/rolling-offer-title-mobile.png'

export const ROLLING_OFFER_TITLE_DESKTOP_SRC = rollingOfferTitleDesktopUrl
export const ROLLING_OFFER_TITLE_MOBILE_SRC = rollingOfferTitleMobileUrl

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

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3.25 6.5V4.25a3.75 3.75 0 0 1 7.5 0V6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="1.25"
        y="6.5"
        width="11.5"
        height="8.25"
        rx="1.6"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="7" cy="10.5" r="1.1" fill="rgba(0,0,0,0.35)" />
      <rect x="6.4" y="10.5" width="1.2" height="2.4" rx="0.6" fill="rgba(0,0,0,0.35)" />
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
