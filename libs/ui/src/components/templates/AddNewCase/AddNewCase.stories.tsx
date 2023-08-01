import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddNewCase } from './AddNewCase'

export default {
  title: 'src/components/templates/AddNewCase',
  component: AddNewCase,
} as ComponentMeta<typeof AddNewCase>

const Template: ComponentStory<typeof AddNewCase> = (args) => (
  <AddNewCase {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
