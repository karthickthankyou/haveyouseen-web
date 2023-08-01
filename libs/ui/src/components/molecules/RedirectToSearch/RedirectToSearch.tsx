import { MAP_MODE } from '@haveyouseen-org/util'
import { useRouter } from 'next/router'

export const RedirectToSearch = () => {
  const router = useRouter()

  router.push({
    pathname: '/',
    query: { mode: MAP_MODE.SEARCH, lat: 32.23, lng: 120.3 },
  })
  return null
}
