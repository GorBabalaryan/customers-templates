import { useEffect, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RollingOffers } from './RollingOffers'
import type { Offer } from './types'

const SAMPLE_IMAGE_GEM =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%23B580FF'/>
          <stop offset='100%' stop-color='%235A1FAA'/>
        </linearGradient>
      </defs>
      <polygon points='32,4 58,24 48,58 16,58 6,24' fill='url(%23g)' stroke='%23380068' stroke-width='2.5' stroke-linejoin='round'/>
      <polygon points='32,4 22,24 42,24' fill='%23E2C7FF' opacity='0.85'/>
    </svg>
  `)

const SAMPLE_IMAGE_COIN =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <circle cx='32' cy='32' r='26' fill='%23FFC836' stroke='%23B27000' stroke-width='3'/>
      <text x='50%' y='54%' text-anchor='middle' font-family='Lilita One, sans-serif' font-size='28' fill='%23B27000'>$</text>
    </svg>
  `)

const SAMPLE_IMAGE_KEY =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <circle cx='22' cy='32' r='12' fill='none' stroke='%23FFD15A' stroke-width='5'/>
      <rect x='32' y='28' width='28' height='8' fill='%23FFD15A'/>
      <rect x='52' y='28' width='4' height='14' fill='%23FFD15A'/>
      <rect x='44' y='28' width='4' height='10' fill='%23FFD15A'/>
    </svg>
  `)

const SAMPLE_IMAGE_HEART =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <path d='M32 56s-22-12.6-22-28a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 15.4-22 28-22 28z' fill='%23FF4E5A' stroke='%237A0010' stroke-width='2.5'/>
    </svg>
  `)

const SAMPLE_IMAGE_SCROLL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <rect x='12' y='14' width='40' height='38' rx='4' fill='%23F5E1A6' stroke='%238A5C00' stroke-width='2.5'/>
      <line x1='20' y1='24' x2='44' y2='24' stroke='%238A5C00' stroke-width='2'/>
      <line x1='20' y1='32' x2='44' y2='32' stroke='%238A5C00' stroke-width='2'/>
      <line x1='20' y1='40' x2='36' y2='40' stroke='%238A5C00' stroke-width='2'/>
    </svg>
  `)

const SAMPLE_IMAGE_CHEST =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <rect x='10' y='28' width='44' height='24' rx='3' fill='%238A5C00' stroke='%23380000' stroke-width='2'/>
      <path d='M10 28 Q32 12 54 28' fill='%23A66E00' stroke='%23380000' stroke-width='2'/>
      <rect x='28' y='34' width='8' height='10' fill='%23FFD15A' stroke='%23380000' stroke-width='1.5'/>
    </svg>
  `)

const DEFAULT_OFFERS: Offer[] = [
  { id: 'gem', name: 'Mystic Gem', imageUrl: SAMPLE_IMAGE_GEM, quantity: 30, badge: 'NEW' },
  { id: 'scroll', name: 'Lucky Scroll', imageUrl: SAMPLE_IMAGE_SCROLL, quantity: 5 },
  { id: 'coin', name: 'Gold Coin', imageUrl: SAMPLE_IMAGE_COIN, quantity: 100 },
  { id: 'key', name: 'Royal Key', imageUrl: SAMPLE_IMAGE_KEY, quantity: 1 },
  { id: 'heart', name: 'Health Potion', imageUrl: SAMPLE_IMAGE_HEART, quantity: 3 },
  { id: 'chest', name: 'Treasure Chest', imageUrl: SAMPLE_IMAGE_CHEST, quantity: 1, badge: 'BEST' },
]

const meta: Meta<typeof RollingOffers> = {
  title: 'Templates/RollingOffers',
  component: RollingOffers,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sequential reward-claim component. Click the active (first) tile to trigger Processing → Success → Unlock animations. Locked tiles cannot be clicked.',
      },
    },
  },
  argTypes: {
    subtitle: {
      control: 'text',
      description: 'Subtitle text rendered above the tile row.',
    },
    processingDurationMs: {
      control: { type: 'range', min: 200, max: 3000, step: 100 },
      description: 'How long the processing overlay stays visible.',
    },
    successDurationMs: {
      control: { type: 'range', min: 500, max: 3500, step: 100 },
      description: 'How long the success screen stays visible.',
    },
    titleImageSrc: {
      control: 'text',
      description: 'Optional title image URL. Falls back to built-in stylized text.',
    },
    onCollect: { action: 'collected' },
    onComplete: { action: 'completed' },
  },
  args: {
    subtitle: 'Ends in 22:22:22',
    processingDurationMs: 1200,
    successDurationMs: 1500,
  },
}

export default meta

type Story = StoryObj<typeof RollingOffers>

export const Default: Story = {
  args: {
    offers: DEFAULT_OFFERS,
  },
}

const InteractivePlayground = (props: ComponentProps<typeof RollingOffers>) => {
  const [offers, setOffers] = useState<Offer[]>(props.offers)
  const [collected, setCollected] = useState<Offer[]>([])
  const remountRef = useRef(0)

  useEffect(() => {
    setOffers(props.offers)
    setCollected([])
  }, [props.offers])

  const reset = () => {
    setOffers(props.offers)
    setCollected([])
    remountRef.current += 1
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <RollingOffers
        {...props}
        key={remountRef.current}
        offers={offers}
        onCollect={(offer) => {
          setCollected((prev) => [...prev, offer])
          props.onCollect?.(offer)
        }}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: '8px 16px',
            background: '#fed245',
            color: '#380068',
            border: 0,
            borderRadius: 8,
            fontFamily: 'Lilita One, sans-serif',
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 2px 0 #b27000',
          }}
        >
          ↺ Reset
        </button>
        <span
          style={{
            color: '#fff',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14,
            opacity: 0.85,
          }}
        >
          Collected: {collected.length} / {props.offers.length}
        </span>
      </div>
    </div>
  )
}

export const Playground: Story = {
  args: {
    offers: DEFAULT_OFFERS,
  },
  render: (args) => <InteractivePlayground {...args} />,
}

export const ThreeOffers: Story = {
  args: {
    offers: DEFAULT_OFFERS.slice(0, 3),
  },
  render: (args) => <InteractivePlayground {...args} />,
}

export const SingleOffer: Story = {
  args: {
    offers: DEFAULT_OFFERS.slice(0, 1),
  },
  render: (args) => <InteractivePlayground {...args} />,
}

export const NoOffers: Story = {
  args: {
    offers: [],
  },
}
