import type { Preview } from '@storybook/react'
import '../src/styles/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'game',
      values: [
        { name: 'game', value: 'linear-gradient(180deg, #1a1a1a 0%, #474747 100%)' },
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
