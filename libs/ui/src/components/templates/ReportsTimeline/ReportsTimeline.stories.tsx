import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReportsTimeline } from './ReportsTimeline'

export default {
  title: 'src/components/templates/ReportsTimeline',
  component: ReportsTimeline,
} as ComponentMeta<typeof ReportsTimeline>

const Template: ComponentStory<typeof ReportsTimeline> = (args) => (
  <ReportsTimeline {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
