import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MissingPersonInfo } from './MissingPersonInfo'

export default {
  title: 'src/components/organisms/MissingPersonInfo',
  component: MissingPersonInfo,
} as ComponentMeta<typeof MissingPersonInfo>

const Template: ComponentStory<typeof MissingPersonInfo> = (args) => (
  <MissingPersonInfo {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
