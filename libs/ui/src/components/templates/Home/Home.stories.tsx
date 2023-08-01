import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HomePage } from './Home'

export default {
  title: 'src/components/templates/Home',
  component: HomePage,
} as ComponentMeta<typeof HomePage>

const Template: ComponentStory<typeof HomePage> = (args) => (
  <HomePage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
