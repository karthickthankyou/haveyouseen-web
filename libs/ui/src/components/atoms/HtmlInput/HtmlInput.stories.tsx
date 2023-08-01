import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HtmlInput } from './HtmlInput'

export default {
  title: 'atoms/HtmlInput',
  component: HtmlInput,
} as ComponentMeta<typeof HtmlInput>

const Template: ComponentStory<typeof HtmlInput> = (args) => (
  <label className="flex flex-col items-start" htmlFor="sample-input">
    <div className="mb-2">Sample input</div>
    <HtmlInput id="sample-input" {...args} />
  </label>
)

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Type something...',
}

export const Password = Template.bind({})
Password.args = {
  type: 'password',
  placeholder: '********',
}
export const DateTime = Template.bind({})
DateTime.args = {
  type: 'datetime-local',
}
