import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TimelineItem } from './TimelineItem'

export default {
  title: 'src/components/molecules/TimelineItem',
  component: TimelineItem,
} as ComponentMeta<typeof TimelineItem>

const Template: ComponentStory<typeof TimelineItem> = (args) => (
  <TimelineItem {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
