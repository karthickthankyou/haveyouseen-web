import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Loader } from './Loader'

export default {
  title: 'src/components/molecules/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = () => <Loader />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
