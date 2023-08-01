import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AudioRecord } from './AudioRecord'

export default {
  title: 'src/components/molecules/AudioRecord',
  component: AudioRecord,
} as ComponentMeta<typeof AudioRecord>

const Template: ComponentStory<typeof AudioRecord> = (args) => (
  <AudioRecord {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
