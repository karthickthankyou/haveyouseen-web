import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MapLines } from './MapLines'

export default {
  title: 'src/components/molecules/MapLines',
  component: MapLines,
} as ComponentMeta<typeof MapLines>

const Template: ComponentStory<typeof MapLines> = (args) => (
  <MapLines {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
