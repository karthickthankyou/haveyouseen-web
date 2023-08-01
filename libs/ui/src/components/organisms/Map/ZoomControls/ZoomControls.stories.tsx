import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ZoomControls from './ZoomControls'

export default {
  title: 'organisms/ZoomControls',
  component: ZoomControls,
} as ComponentMeta<typeof ZoomControls>

const Template: ComponentStory<typeof ZoomControls> = () => (
  <ZoomControls>
    <ZoomControls.ZoomIn />
    <ZoomControls.ZoomOut />
  </ZoomControls>
)

export const Primary = Template.bind({})
