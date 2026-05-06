import { useEffect, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RollingOffers } from './RollingOffers'
import type { Offer } from './types'

const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg'

const DEFAULT_OFFERS: Offer[] = [
  { id: 'gem', name: 'Mystic Gem', imageUrl: `${TWEMOJI_BASE}/1f48e.svg`, quantity: 30, badge: 'NEW' },
  { id: 'scroll', name: 'Lucky Scroll', imageUrl: `${TWEMOJI_BASE}/1f4dc.svg`, quantity: 5 },
  { id: 'coin', name: 'Gold Coin', imageUrl: `${TWEMOJI_BASE}/1fa99.svg`, quantity: 100 },
  { id: 'key', name: 'Royal Key', imageUrl: `${TWEMOJI_BASE}/1f5dd.svg`, quantity: 1 },
  { id: 'heart', name: 'Health Potion', imageUrl: `${TWEMOJI_BASE}/2764.svg`, quantity: 3 },
  { id: 'moneybag', name: 'Money Bag', imageUrl: `${TWEMOJI_BASE}/1f4b0.svg`, quantity: 1, badge: 'BEST' },
  { id: 'crown', name: 'Royal Crown', imageUrl: `${TWEMOJI_BASE}/1f451.svg`, quantity: 1 },
  { id: 'trophy', name: 'Trophy', imageUrl: `${TWEMOJI_BASE}/1f3c6.svg`, quantity: 1 },
  { id: 'sword', name: 'Iron Sword', imageUrl: `${TWEMOJI_BASE}/1f5e1.svg`, quantity: 2 },
  { id: 'shield', name: 'Iron Shield', imageUrl: `${TWEMOJI_BASE}/1f6e1.svg`, quantity: 1 },
  { id: 'wand', name: 'Magic Wand', imageUrl: `${TWEMOJI_BASE}/1fa84.svg`, quantity: 1, badge: 'RARE' },
  { id: 'gift', name: 'Surprise Gift', imageUrl: `${TWEMOJI_BASE}/1f381.svg`, quantity: 1 },
  { id: 'ring', name: 'Diamond Ring', imageUrl: `${TWEMOJI_BASE}/1f48d.svg`, quantity: 1 },
  { id: 'target', name: 'Target', imageUrl: `${TWEMOJI_BASE}/1f3af.svg`, quantity: 1 },
  { id: 'dice', name: 'Lucky Dice', imageUrl: `${TWEMOJI_BASE}/1f3b2.svg`, quantity: 2 },
  { id: 'potion', name: 'Mana Potion', imageUrl: `${TWEMOJI_BASE}/1f9ea.svg`, quantity: 5 },
  { id: 'bow', name: 'Hunter Bow', imageUrl: `${TWEMOJI_BASE}/1f3f9.svg`, quantity: 1 },
  { id: 'star', name: 'Lucky Star', imageUrl: `${TWEMOJI_BASE}/2b50.svg`, quantity: 10, badge: 'HOT' },
  { id: 'fire', name: 'Fire Charm', imageUrl: `${TWEMOJI_BASE}/1f525.svg`, quantity: 3 },
  { id: 'bolt', name: 'Lightning', imageUrl: `${TWEMOJI_BASE}/26a1.svg`, quantity: 7 },
  { id: 'clover', name: 'Lucky Clover', imageUrl: `${TWEMOJI_BASE}/1f340.svg`, quantity: 1 },
  { id: 'skull', name: 'Skull Token', imageUrl: `${TWEMOJI_BASE}/1f480.svg`, quantity: 1 },
  { id: 'dragon', name: 'Dragon Egg', imageUrl: `${TWEMOJI_BASE}/1f409.svg`, quantity: 1, badge: 'MYTHIC' },
  { id: 'unicorn', name: 'Unicorn', imageUrl: `${TWEMOJI_BASE}/1f984.svg`, quantity: 1, badge: 'LEGEND' },
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
