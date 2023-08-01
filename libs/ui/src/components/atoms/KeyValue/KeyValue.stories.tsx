import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { KeyValue } from './KeyValue'

export default {
  title: 'src/components/atoms/KeyValue',
  component: KeyValue,
} as ComponentMeta<typeof KeyValue>

const Template: ComponentStory<typeof KeyValue> = (args) => (
  <KeyValue {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
