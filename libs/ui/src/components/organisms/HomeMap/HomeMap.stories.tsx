import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HomeMap } from './HomeMap'

export default {
  title: 'src/components/organisms/HomeMap',
  component: HomeMap,
} as ComponentMeta<typeof HomeMap>

const Template: ComponentStory<typeof HomeMap> = (args) => <HomeMap {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
