import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Accordion from './Accordion'

export default {
  title: 'molecules/Accordion',
  component: Accordion,
  decorators: [(story) => <div className="max-w-md">{story()}</div>],
} as ComponentMeta<typeof Accordion>

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} defaultOpen />
)

const AccordionListTemplate: ComponentStory<typeof Accordion> = () => (
  <>
    <Accordion defaultOpen title="Title 1">
      <div>Body 1</div>
    </Accordion>
    <Accordion defaultOpen title="Title 2">
      <div>Body 2</div>
    </Accordion>
    <Accordion defaultOpen title="Title 3">
      <div>Body 3</div>
    </Accordion>
  </>
)
const AccordionListTemplateLoose: ComponentStory<typeof Accordion> = () => (
  <>
    <Accordion defaultOpen title="Title 1" className="py-3">
      <div>Body 1</div>
    </Accordion>
    <Accordion defaultOpen title="Title 2" className="py-3">
      <div>Body 2</div>
    </Accordion>
    <Accordion defaultOpen title="Title 3" className="py-3">
      <div>Body 3</div>
    </Accordion>
  </>
)
const NestedAccordionListTemplate: ComponentStory<typeof Accordion> = () => (
  <Accordion defaultOpen title="I have an accodion inside me!" className="py-3">
    <Accordion defaultOpen title="I have one too." className="py-3">
      <Accordion defaultOpen title="I have nothing. 🙄" className="py-3">
        <div>You have me... 😟</div>
      </Accordion>
    </Accordion>
  </Accordion>
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Helo World',
  children: <div>Children</div>,
}

export const AccordionList = AccordionListTemplate.bind({})

export const AccordionListLoose = AccordionListTemplateLoose.bind({})

export const NestedAccordionList = NestedAccordionListTemplate.bind({})
