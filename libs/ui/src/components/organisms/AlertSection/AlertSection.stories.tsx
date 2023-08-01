import type { Meta, StoryObj } from '@storybook/react'
import { AlertSection } from './AlertSection'

const meta: Meta<typeof AlertSection> = {
  component: AlertSection,
}
export default meta

type Story = StoryObj<typeof AlertSection>

export const Primary: Story = {
  args: {
    children: <div>Hey. This is content.</div>,
    title: 'This is a title.',
  },
}
