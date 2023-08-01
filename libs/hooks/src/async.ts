import { useState, useEffect } from 'react'
import { catchError, debounceTime, EMPTY, Subject, tap } from 'rxjs'

export const useDebounce = (delay: number = 1000) => {
  const [debouncedSet$] = useState(() => new Subject<() => void>())
  useEffect(() => {
    const subscription = debouncedSet$
      .pipe(
        debounceTime(delay),
        tap((func) => func()),
        catchError(() => EMPTY),
      )
      .subscribe()
    return () => subscription.unsubscribe()
  }, [delay, debouncedSet$])

  return debouncedSet$
}

export const useDebouncedValue = <T>(value: T, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const debouncedSet$ = useDebounce(delay)

  useEffect(() => {
    debouncedSet$.next(() => setDebouncedValue(value))
  }, [debouncedSet$, value])

  return debouncedValue
}

export const TAKE_COUNT = 12
export const useTakeSkip = (initialSkip = 0, initialTake = TAKE_COUNT) => {
  const [skip, setSkip] = useState(() => initialSkip)
  const [take, setTake] = useState(() => initialTake)

  return { take, skip, setTake, setSkip }
}
