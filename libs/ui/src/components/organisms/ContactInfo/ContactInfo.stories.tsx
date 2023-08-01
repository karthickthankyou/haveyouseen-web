import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ContactInfo } from './ContactInfo'

export default {
  title: 'src/components/organisms/ContactInfo',
  component: ContactInfo,
} as ComponentMeta<typeof ContactInfo>

const Template: ComponentStory<typeof ContactInfo> = (args) => (
  <ContactInfo {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
