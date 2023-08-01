import type { Meta, StoryObj } from '@storybook/react'
import { TitleValue } from './TitleValue'

const meta: Meta<typeof TitleValue> = {
  component: TitleValue,
}
export default meta

type Story = StoryObj<typeof TitleValue>

export const Primary: Story = {
  args: {
    children: 'Children',
    title: 'Title',
  },
}

export const Stat: Story = {
  args: {
    children: '25 gm',
    title: 'Weight',
  },
}
