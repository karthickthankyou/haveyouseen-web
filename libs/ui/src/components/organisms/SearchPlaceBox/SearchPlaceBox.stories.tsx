import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchPlaceBox } from './SearchPlaceBox'

export default {
  title: 'components/organisms/SearchPlaceBox',
  component: SearchPlaceBox,
} as ComponentMeta<typeof SearchPlaceBox>

const Template: ComponentStory<typeof SearchPlaceBox> = (args) => (
  <SearchPlaceBox {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
