import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ConfidenceMeter } from './ConfidenceMeter'

export default {
  title: 'src/components/molecules/ConfidenceMeter',
  component: ConfidenceMeter,
} as ComponentMeta<typeof ConfidenceMeter>

const Template: ComponentStory<typeof ConfidenceMeter> = (args) => (
  <ConfidenceMeter {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  confidence: 1,
}
Primary.parameters = {}
