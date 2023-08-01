import type { Meta, StoryObj } from '@storybook/react'
import { RegisterForm } from './RegisterForm'

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
}
export default meta

type Story = StoryObj<typeof RegisterForm>

export const Primary: Story = {}
