import type { Meta, StoryObj } from '@storybook/react'
import { IsLoggedIn } from './IsLoggedIn'

const meta: Meta<typeof IsLoggedIn> = {
  component: IsLoggedIn,
}
export default meta

type Story = StoryObj<typeof IsLoggedIn>

export const Primary: Story = {}
