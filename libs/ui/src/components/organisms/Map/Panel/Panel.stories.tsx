import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Panel } from './Panel'

export default {
  title: 'src/components/organisms/Map/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
