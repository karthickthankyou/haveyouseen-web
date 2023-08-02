import { useRouter } from 'next/router'

export const RedirectToSearch = () => {
  const router = useRouter()

  router.push({
    pathname: '/',
    query: { lat: 32.23, lng: 120.3 },
  })
  return null
}
