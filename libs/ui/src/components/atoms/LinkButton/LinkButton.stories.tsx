import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LinkButton } from './LinkButton'

export default {
  title: 'components/atoms/LinkButton',
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  href: '/',
  children: 'LinkButton',
}
Primary.parameters = {}
