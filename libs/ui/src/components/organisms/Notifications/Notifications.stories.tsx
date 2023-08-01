import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Notifications } from './Notifications'

export default {
  title: 'organisms/Notifications',
  component: Notifications,
} as ComponentMeta<typeof Notifications>

const Template: ComponentStory<typeof Notifications> = (args) => (
  <Notifications />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
