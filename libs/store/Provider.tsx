import { Provider } from 'react-redux'
import { ReactNode, useEffect } from 'react'
import { store, useAppDispatch } from '.'
import { resetUser, setUser } from './user'

export const ReduxProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
)

export const ReduxAddUid = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setUser({ uid: 'some_id', displayName: 'Karthick Ragavendran' }))

    return () => {
      dispatch(resetUser())
    }
  }, [dispatch, setUser])

  return <> {children} </>
}
