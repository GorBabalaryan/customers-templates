# customers-templates

Production-ready React component library for the **Rolling Offer** feature — a sequential reward-claim UI matched 1:1 to the Figma baseline and the supplied reference video.

Built with React 18+, TypeScript, Framer Motion. Ships as ESM + CJS with bundled `.d.ts` types and a single CSS file. Compatible with Next.js App Router (interactive entry points carry the `"use client"` directive).

## Install

```bash
npm install customers-templates framer-motion
```

`framer-motion` is a peer dep of the animations layer; install it alongside.

## Usage

```tsx
import { RollingOffers } from 'customers-templates'
import 'customers-templates/styles.css'

const offers = [
  { id: 'gem',  name: 'Mystic Gem', imageUrl: '/icons/gem.png',  quantity: 30, badge: 'NEW' },
  { id: 'coin', name: 'Gold Coin',  imageUrl: '/icons/coin.png', quantity: 100 },
  { id: 'key',  name: 'Royal Key',  imageUrl: '/icons/key.png',  quantity: 1 },
]

export default function Page() {
  return (
    <RollingOffers
      offers={offers}
      subtitle="Ends in 22:22:22"
      onCollect={(offer) => awardReward(offer)}
      onComplete={() => trackEvent('rolling_offers_complete')}
    />
  )
}
```

### Next.js App Router

The component is server-component-safe at the type level. Interactive children carry `"use client"` internally, so you can import it directly inside any server file. If you import the package inside a server component, Next.js will tree-shake the client subtree automatically.

```tsx
// app/promo/page.tsx — Server Component
import { RollingOffers } from 'customers-templates'
import 'customers-templates/styles.css'

export default function Promo() {
  const offers = await fetchOffers()
  return <RollingOffers offers={offers} />
}
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `offers` | `Offer[]` | required | Sequence of offers. Index 0 is always the active one. |
| `subtitle` | `string` | `"Ends in 22:22:22"` | Subtitle / timer label above the row. |
| `titleImageSrc` | `string` | inline SVG | Override the brand mark with a custom image. |
| `onCollect` | `(offer) => void` | — | Fires after the success screen. Use to grant rewards. |
| `onComplete` | `() => void` | — | Fires when the queue is empty. |
| `processingDurationMs` | `number` | `1200` | How long the processing overlay stays. |
| `successDurationMs` | `number` | `1500` | How long the success screen stays. |
| `className` | `string` | — | Forwarded onto the root `<div>`. |

### `Offer` shape

```ts
interface Offer {
  id: string             // stable React key
  name: string           // shown in the success screen caption
  imageUrl: string       // product art
  quantity?: number      // shown as "×N" on tile + caption
  badge?: string         // top-left ribbon text (e.g. "BEST", "x2")
}
```

## States & animation flow

1. **Idle** — first tile pulses subtly (scale + Y bob + glow). Locked tiles show a padlock and stay still.
2. **Processing** — clicking the active tile dims the panel and rotates a spinner with a "Processing" label.
3. **Success** — a burst of gold rays + 10 particles + the reward icon spring in, with a "You got X!" caption.
4. **Shift / Unlock** — the active tile is removed, the next tile slides into position via Framer Motion's `layout` engine and starts its idle pulse.

The whole flow is configurable via `processingDurationMs` and `successDurationMs`.

## Responsive

- **≥768 px** — single horizontal row matching the Figma desktop frame `5048-127`.
- **<768 px** — tiles wrap to a 2-column grid matching the mobile frame `5048-16`. Container background, paddings, fonts, and tile dimensions all switch via media query using the exact Figma tokens (180 → 150 px tiles, 10.8 → 11.84 px radii, etc.).

## Local development

```bash
npm install
npm run storybook   # http://localhost:6006
```

Storybook ships four stories, including an **interactive Playground** with full args controls (subtitle, durations, title image) and a **Reset** button to replay the collect animation.

```bash
npm run build              # builds dist/ (ESM + CJS + .d.ts + customers-templates.css)
npm run build-storybook    # builds storybook-static/
npm run lint               # eslint
npm run format             # prettier
```

## Project structure

```
src/
├── index.ts                          public exports
├── styles/global.css                 storybook-only canvas reset
└── RollingOffers/
    ├── index.ts                      barrel
    ├── types.ts                      Offer + RollingOffersProps + status union
    ├── RollingOffers.tsx             state machine + responsive layout
    ├── RollingOffers.css             panel, row, chevrons, breakpoints
    ├── RollingOffers.stories.tsx     Storybook stories
    ├── styles/tokens.css             CSS variables transcribed from Figma
    └── components/
        ├── OfferTile.tsx + .css      tile with active/locked variants
        ├── ProcessingOverlay.tsx + .css   dark overlay + spinner
        ├── SuccessScreen.tsx + .css       burst + particles + reward
        └── icons.tsx                 inline SVGs (chevrons, lock, title, rays)
```

## Architectural notes

- **Vite library mode** over Rollup — ergonomic config, native ESM, and the same Vite dev server already powers Storybook 8. `vite-plugin-dts` runs only when `LIB_BUILD=true` so it doesn't fire during Storybook builds.
- **CSS variables, not CSS-in-JS** — design tokens transcribed 1:1 from Figma into `tokens.css`. Trivially overridable by the consumer (`--ct-tile-body: #...`) without forking the package.
- **Framer Motion `layout` + `AnimatePresence`** — the unlock / shift animation is achieved by giving each tile a stable `id` key and letting the layout engine animate the position change for free. No manual `x` calculations.
- **`"use client"`** — placed on every file that owns hooks or motion (`RollingOffers`, `OfferTile`, `ProcessingOverlay`, `SuccessScreen`). The `index.ts` and `types.ts` stay free of side effects so importing the package from a server component is cheap.
- **Single bundled CSS** (`cssCodeSplit: false`) — one stylesheet, one `import 'customers-templates/styles.css'` call. No surprise side-effect imports per component.
