import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddReports } from './AddReports'

export default {
  title: 'src/components/templates/AddReports',
  component: AddReports,
} as ComponentMeta<typeof AddReports>

const Template: ComponentStory<typeof AddReports> = (args) => <AddReports />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
