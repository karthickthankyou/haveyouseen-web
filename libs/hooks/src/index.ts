import { notification$ } from '@haveyouseen-org/util/subjects'
import { useRouter } from 'next/router'
import { RefObject, useEffect, useRef, useState } from 'react'
import { selectUid } from '@haveyouseen-org/store/user'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@haveyouseen-org/store'

export const useRedirectLoggedInUsers = () => {
  const uid = useAppSelector(selectUid)
  const router = useRouter()
  if (uid) {
    notification$.next({
      message: 'Logged in',
      type: 'warning',
    })
    router.push('/')
  }
}

export const useScrollTo = () => {
  const interactiveMapRef = useRef<HTMLDivElement | null>(null)

  const executeScroll = () =>
    interactiveMapRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  return [interactiveMapRef, executeScroll] as const
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const useScroll = (): [
  [number, number],
  RefObject<HTMLDivElement>,
  () => void,
  (distance: number) => void,
] => {
  const [scrollPos, setScrollPos] = useState<[number, number]>([0, 0])
  const scrollEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollEl.current
    element?.addEventListener('wheel', (e) => e.preventDefault)

    return () => {
      element?.removeEventListener('wheel', (e) => e.preventDefault)
    }
  }, [])

  const scroll = (distance: number) => {
    if (scrollEl.current) {
      const leftPos = scrollEl.current.scrollLeft + distance
      scrollEl.current?.scrollTo({ left: leftPos, behavior: 'smooth' })
    }
  }

  const scrollListesener = () => {
    const start = scrollEl.current ? scrollEl?.current.scrollLeft : 0
    const end = (() => {
      if (scrollEl?.current) {
        const { scrollWidth, clientWidth } = scrollEl.current
        return scrollWidth - clientWidth
      }
      return 0
    })()
    setScrollPos([start, end - start])
  }
  useEffect(() => {
    scrollListesener()
  }, [])

  return [scrollPos, scrollEl, scrollListesener, scroll]
}

export const useKeypress = (keys: string[], action?: Function) => {
  useEffect(() => {
    const onKeyup = (e: { key: any }) => {
      if (keys.includes(e.key) && action) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [action, keys])
}

export const useIsPathInArray = (pathArray: string[]) => {
  const currentPath = usePathname()
  return pathArray.includes(currentPath)
}
