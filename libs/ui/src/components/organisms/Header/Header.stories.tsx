import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from './Header'

export default {
  title: 'organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
