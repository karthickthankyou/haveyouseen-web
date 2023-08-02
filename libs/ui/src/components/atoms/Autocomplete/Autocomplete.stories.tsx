import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Autocomplete } from './Autocomplete'

export default {
  title: 'atoms/Autocomplete',
  component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <Autocomplete {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
