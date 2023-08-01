import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Officer } from './Officer'

export default {
  title: 'src/components/templates/Officer',
  component: Officer,
} as ComponentMeta<typeof Officer>

const Template: ComponentStory<typeof Officer> = (args) => <Officer {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
