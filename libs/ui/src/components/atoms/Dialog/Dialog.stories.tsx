import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Primary: Story = {
  args: {
    children: (
      <div>
        <div>Hey! Im inside a dialog.</div>
        <div>Toggle open/close in the controls tab.</div>
      </div>
    ),
    open: true,
    title: 'Dialog title',
  },
}

export const WideDialog: Story = {
  args: {
    children: 'Hey! Im inside a dialog.',
    open: true,
    title: 'Dialog title',
    widthClassName: 'max-w-4xl',
  },
}
