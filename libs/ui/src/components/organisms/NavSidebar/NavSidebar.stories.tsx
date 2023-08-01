import type { Meta, StoryObj } from '@storybook/react'
import { NavSidebar } from './NavSidebar'

const meta: Meta<typeof NavSidebar> = {
  component: NavSidebar,
}
export default meta

type Story = StoryObj<typeof NavSidebar>

export const Primary: Story = {
  args: {
    menuItems: [
      { href: '/', label: 'Menu 1', loggedIn: false },
      { href: '/', label: 'Menu 2', loggedIn: false },
      { href: '/', label: 'Menu 3', loggedIn: false },
      { href: '/', label: 'Menu 4', loggedIn: false },
    ],
  },
}
