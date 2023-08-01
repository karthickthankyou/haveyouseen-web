import Link from 'next/link'
import { Brand } from '../../atoms/Brand'
import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'

import { NavSidebar, ShowMenuItems } from '../NavSidebar/NavSidebar'
import { Suspense } from 'react'

import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'

import { MenuItem, Role } from '@haveyouseen-org/types'

export type IHeaderProps = {
  menuItems?: MenuItem[]
  sideMenuItems?: MenuItem[]
  type?: Role
}

export const Header = ({
  menuItems = [],
  sideMenuItems = [],
  type,
}: IHeaderProps) => {
  const uid = useAppSelector(selectUid)

  return (
    <header className="z-40">
      <nav className="fixed top-0 w-full shadow-md shadow-gray-300/10 bg-white/50 backdrop-blur-md">
        <Container className="relative z-50 flex items-center justify-between h-16 py-2">
          <div className="relative flex items-center justify-between w-full gap-16">
            <Link href="/" aria-label="Home" className="w-auto">
              <Brand type={type} />
            </Link>

            <Suspense fallback={null}>
              <ShowMenuItems menuItems={menuItems} />
            </Suspense>

            <div className="flex items-center gap-2">
              {!uid ? (
                <>
                  <Link href="/register">
                    <Button variant="outlined" className="hidden md:block">
                      Create account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log in</Button>
                  </Link>
                </>
              ) : null}

              <NavSidebar menuItems={sideMenuItems} />
            </div>
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
