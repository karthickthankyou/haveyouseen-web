import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { userReducer } from './user'
import { utilsReducer } from './utils'

export const store = configureStore({
  reducer: {
    user: userReducer,
    utils: utilsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const composedEnhancers = composeWithDevTools()

export const store$ = new Observable<RootState>((subscriber) => {
  // Subscribe to the Redux store
  const unsubscribe = store.subscribe(() => {
    subscriber.next(store.getState())
  })

  // Unsubscribe when the Observable is unsubscribed
  return () => {
    unsubscribe()
  }
})
export type StoreObservableType = typeof store$
