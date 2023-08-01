import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NewReport } from './NewReport'

export default {
  title: 'src/components/templates/NewReport',
  component: NewReport,
} as ComponentMeta<typeof NewReport>

const Template: ComponentStory<typeof NewReport> = (args) => (
  <NewReport {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
