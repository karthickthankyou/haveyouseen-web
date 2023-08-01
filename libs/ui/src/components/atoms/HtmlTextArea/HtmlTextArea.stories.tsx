import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HtmlTextArea } from './HtmlTextArea'

export default {
  title: 'atoms/HtmlTextArea',
  component: HtmlTextArea,
} as ComponentMeta<typeof HtmlTextArea>

const Template: ComponentStory<typeof HtmlTextArea> = (args) => (
  <label className="flex flex-col items-start" htmlFor="textarea">
    <div className="mb-2">Sample textarea</div>
    <HtmlTextArea {...args} id="textarea" />
  </label>
)

export const TwoRows = Template.bind({})
TwoRows.args = {
  rows: 2,
  placeholder:
    'This component gets all props that you can pass to a vanilla HTML text area component.',
}

export const FiveRows = Template.bind({})
FiveRows.args = {
  rows: 5,
  placeholder: '5 rows...',
}
