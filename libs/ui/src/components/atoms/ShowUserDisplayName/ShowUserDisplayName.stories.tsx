import type { Meta, StoryObj } from '@storybook/react'
import { ShowUserDisplayName } from './ShowUserDisplayName'

const meta: Meta<typeof ShowUserDisplayName> = {
  component: ShowUserDisplayName,
}
export default meta

type Story = StoryObj<typeof ShowUserDisplayName>

export const Primary: Story = {}
