import '../src/index.css'
import 'react-quill/dist/quill.snow.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { initialize, mswLoader } from 'msw-storybook-addon'

import type { Preview } from '@storybook/react'
import { ApolloProvider } from '@haveyouseen-org/network/src/config/apollo'
import { ReduxProvider } from '@haveyouseen-org/store/Provider'
import * as NextImage from 'next/image'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import React from 'react'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextRouter: {
      Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
    },
  },
  decorators: [
    (Story) => (
      <ReduxProvider>
        <ApolloProvider>
          <Story />
        </ApolloProvider>
      </ReduxProvider>
    ),
  ],
  loaders: [mswLoader],
}

// Override next/image during Storybook testing
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />
  },
})

export default preview
