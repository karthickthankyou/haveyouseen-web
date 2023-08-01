import Link from 'next/link'

import {
  IconChevronRight,
  IconDoorExit,
  IconMenu2,
  IconUser,
} from '@tabler/icons-react'

import { Sidebar } from '../Sidebar'

import { Dispatch, SetStateAction, useState } from 'react'

import { Brand } from '../../atoms/Brand'

import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'
import { useAppSelector } from '@haveyouseen-org/store'
import { Role, selectUser } from '@haveyouseen-org/store/user'
import { signOut } from '@haveyouseen-org/network/src/auth'
import { useOfficerMeQuery } from '@haveyouseen-org/network/src/generated'

const OFFICER_MENUITEMS = [
  ['Cases', '/cases'],
  ['+ Add new case', '/add-new-case'],
]

const ROLELINKS = [
  { name: 'Admin page', href: '/admin', role: 'admin' },
  { name: 'Officer page', href: '/officer', role: 'officer' },
]

export const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    key={label}
    href={href}
    className="text-sm text-gray-600 hover:text-black hover:underline underline-offset-4"
  >
    {label}
  </Link>
)

const NavSidebarUser = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const user = useAppSelector(selectUser)
  const officer = useOfficerMeQuery()

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header>
        <div className="text-white -skew-y-6 bg-black ">
          <div className="flex items-end justify-between">
            <div className="text-xl">
              <div className="max-w-xs pt-8 pb-2 pl-2 pr-8 text-5xl font-bold">
                Hey there!{' '}
                {user.uid ? (
                  <span className="text-primary">{user.displayName}</span>
                ) : (
                  'Visitor.'
                )}
              </div>
            </div>
          </div>
          <div className="absolute left-0 w-2 h-12 bg-black" />
          <div className="absolute right-0 w-2 h-12 bg-black" />
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="flex flex-col items-start w-full pt-12">
          {ROLELINKS.filter(
            (roleLink) => user.roles?.includes(roleLink.role as Role),
          ).map((item) => (
            <Link
              href={item.href}
              className="py-1.5 group hover:underline underline-offset-4 font-bold text-xl capitalize flex justify-between w-full items-center"
              key={item.name}
            >
              {item.name}
              <IconChevronRight className="block w-6 h-6 p-1 bg-white rounded-full group-hover:animate-slide-right" />
            </Link>
          ))}
          <div className="py-1 bg-gray-100 h-0.5" />
          {[
            { name: 'My account', href: '/profile' },
            { name: 'Support', href: '/support' },
            { name: 'Get access', href: '/get-access' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-1.5 font-medium hover:underline text-gray-600 capitalize"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <Link href={'/owner'}>Owner</Link>
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        {!user.uid ? (
          <>
            <Link
              href="/login"
              className="py-2 block w-full border border-black  text-black text-center mt-1.5 font-medium capitalize"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="py-2 block w-full bg-black font-medium border border-black  text-white text-center mt-1.5 capitalize"
            >
              Create account
            </Link>
          </>
        ) : (
          <>
            <Link href={`/user/${user.uid}`} className="flex items-center ">
              {user.displayName || ''}
            </Link>

            <Button
              variant="text"
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              Log out <IconDoorExit />
            </Button>
          </>
        )}
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const NavSidebar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const user = useAppSelector(selectUser)
  const officer = useOfficerMeQuery()

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header>
        <Brand shortForm />
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="flex flex-col items-start space-y-1">
          {officer?.data
            ? OFFICER_MENUITEMS.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))
            : null}

          <div className="py-2" />
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        {!user ? (
          <>
            <Link
              href="/login"
              className="py-2 block w-full border border-black  text-black text-center mt-1.5 font-medium capitalize"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="py-2 block w-full bg-black font-medium border border-black  text-white text-center mt-1.5 capitalize"
            >
              Create account
            </Link>
          </>
        ) : (
          <Link href={`/user/${user.uid}`} className="flex items-center ">
            {user.uid || ''}
          </Link>
        )}
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const user = useAppSelector(selectUser)
  const officer = useOfficerMeQuery()

  return (
    <header>
      <nav className="fixed top-0 w-full shadow-md shadow-gray-300/10 bg-white/20 backdrop-blur-md">
        <Container className="relative z-50 flex items-center justify-between h-16 py-2">
          <NavSidebar open={open} setOpen={setOpen} />
          <NavSidebarUser open={openUser} setOpen={setOpenUser} />
          <div className="relative z-10 flex items-center justify-between w-full gap-16">
            <Link href="/" aria-label="Home" className="w-auto">
              <Brand className="hidden h-10 sm:block" />
              <Brand shortForm className="block sm:hidden" />
            </Link>
            <div className="items-center hidden ml-auto lg:flex lg:gap-10">
              {officer?.data
                ? OFFICER_MENUITEMS.map(([label, href]) => (
                    <NavLink label={label} href={href} key={label} />
                  ))
                : null}
            </div>
            <div className="flex items-center">
              {!user ? (
                <>
                  <Link href="/signup">
                    <Button variant="outlined" className="hidden md:block">
                      Create account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log in</Button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => setOpenUser((state) => !state)}
                  type="button"
                  className="p-1 border rounded-full"
                >
                  <IconUser className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen((state) => !state)}
                className="p-2 lg:hidden"
                aria-label="Open main menu"
              >
                <IconMenu2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
