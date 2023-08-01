import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Map } from './Map'

export default {
  title: 'src/components/organisms/Map',
  component: Map,
} as ComponentMeta<typeof Map>

const Template: ComponentStory<typeof Map> = (args) => <Map {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
