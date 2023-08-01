import { useState } from 'react'
import Link from 'next/link'
import { IconDoorExit, IconMenu2 } from '@tabler/icons-react'
import { Sidebar } from '../Sidebar'
import { Brand } from '../../atoms/Brand'
import { Button } from '../../atoms/Button'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'

import { MenuItem } from '@haveyouseen-org/types'
import { signOut } from '@haveyouseen-org/network/src/auth'

export interface INavSidebarProps {
  menuItems: MenuItem[]
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {
  const [open, setOpen] = useState(false)

  const uid = useAppSelector(selectUid)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="p-2"
        aria-label="Open main menu"
      >
        <IconMenu2 className="w-5 h-5" />
      </button>
      <Sidebar open={open} setOpen={setOpen}>
        <Sidebar.Header>
          <Brand />
        </Sidebar.Header>
        <Sidebar.Body>
          <div className="flex flex-col items-start space-y-1">
            {menuItems
              .filter(({ loggedIn }) => !loggedIn || uid)
              .map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            <div className="py-2" />
          </div>
        </Sidebar.Body>
        <Sidebar.Footer>
          {!uid ? (
            <>
              <Link
                href="/login"
                className="py-2 block w-full border border-black rounded text-black text-center mt-1.5 font-medium capitalize"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="py-2 block w-full bg-black font-medium rounded border border-black text-white text-center mt-1.5 capitalize"
              >
                Create account
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="text"
                onClick={async () => {
                  await signOut()
                }}
                className="flex items-center gap-2"
              >
                Log out <IconDoorExit />
              </Button>
            </>
          )}
        </Sidebar.Footer>
      </Sidebar>
    </>
  )
}

export const ShowMenuItems = ({ menuItems }: INavSidebarProps) => {
  const uid = useAppSelector(selectUid)

  if (!uid) return null
  return (
    <div className="items-center hidden ml-auto lg:flex lg:gap-10">
      {menuItems
        .filter(({ loggedIn }) => !loggedIn || uid)
        .map(({ href, label }) => (
          <NavLink label={label} href={href} key={label} />
        ))}
    </div>
  )
}

export const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    key={label}
    href={href}
    className="text-sm transition-all hover:text-black hover:font-semibold hover:underline underline-offset-4"
  >
    {label}
  </Link>
)
