import type { Meta, StoryObj } from '@storybook/react'
import { SearchPlaceBox } from './SearchPlaceBox'

const meta: Meta<typeof SearchPlaceBox> = {
  component: SearchPlaceBox,
}
export default meta

type Story = StoryObj<typeof SearchPlaceBox>

export const Primary: Story = {
  args: {},
}
