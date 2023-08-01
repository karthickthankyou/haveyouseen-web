import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RedirectToSearch } from './RedirectToSearch'

export default {
  title: 'src/components/molecules/RedirectToSearch',
  component: RedirectToSearch,
} as ComponentMeta<typeof RedirectToSearch>

const Template: ComponentStory<typeof RedirectToSearch> = (args) => (
  <RedirectToSearch />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
