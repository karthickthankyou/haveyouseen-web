import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Marker } from './MapMarker'
import { Map } from '../Map'
import { LngLatBounds } from 'mapbox-gl'

export default {
  title: 'molecules/MapMarker',
  component: Marker,
} as ComponentMeta<typeof Marker>

const Template: ComponentStory<typeof Marker> = (args) => (
  <Map>
    <Marker {...args} />
  </Map>
)

export const Primary = Template.bind({})
Primary.args = {}
