import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@haveyouseen-org/store'
import { selectUser, setUser } from '@haveyouseen-org/store/user'

import jwtDecode from 'jwt-decode'
import { auth } from './firebase'

export interface IApolloProviderProps {
  children: ReactNode
}

export const getLatestToken = async ({ token }: { token: string }) => {
  const decoded: any = jwtDecode(token || '')

  const currentTime = new Date()

  const expirytime = new Date(decoded?.exp * 1000)
  const bufferTime = 5 * 60 * 1000
  const timeToExpire = expirytime.getTime() - currentTime.getTime()

  console.log(
    'Auth checK ',
    currentTime,
    expirytime,
    timeToExpire / 1000,
    'Seconds to expire',
  )

  if (timeToExpire < bufferTime) {
    // Refresh token
    const currentUser = auth.currentUser
    if (currentUser) {
      const newToken = await currentUser.getIdToken()
      return newToken
    }
  }
  return token
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const { uid, loaded, token } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  //   Create an http link
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    if (!token) {
      return {
        headers,
      }
    }

    const authToken = await getLatestToken({ token })

    if (authToken !== token) {
      dispatch(setUser({ uid, token: authToken }))
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  // Create an Apollo Client instance
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <Provider client={apolloClient}>{children}</Provider>
}
