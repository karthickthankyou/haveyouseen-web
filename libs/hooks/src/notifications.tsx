import {
  addNotification,
  removeNotification,
} from '@haveyouseen-org/store/utils'

import { notification$ } from '@haveyouseen-org/util/subjects'
import { makeId } from '@haveyouseen-org/util'
import { useEffect } from 'react'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  delay,
  catchError,
  EMPTY,
} from 'rxjs'
import { useAppDispatch } from '@haveyouseen-org/store'
import {} from '@haveyouseen-org/store/utils'

export const useNotification = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const subscription = notification$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((v) => ({ ...v, id: makeId(12) })),
        tap((v) => {
          dispatch(addNotification(v))
        }),
        delay(4000),
        tap((v) => {
          dispatch(removeNotification(v.id))
        }),
        catchError((e) => {
          return EMPTY
        }),
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [addNotification, removeNotification])
}
