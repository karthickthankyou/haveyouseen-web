import { useState, useCallback } from 'react'
type AsyncFn<T, U> = (args: U) => Promise<T>

type State<T> = {
  loading: boolean
  error: any
  success: boolean
  data: T | null
}

type UseAsyncReturnType<T, U> = State<T> & { callAsyncFn: (arg: U) => void }

export const useAsync = <T, U>(
  asyncFn: AsyncFn<T, U>,
  manageErr?: (err: any) => String,
): UseAsyncReturnType<T, U> => {
  const [state, setState] = useState<State<T>>({
    loading: false,
    error: null,
    success: false,
    data: null,
  })

  const callAsyncFn = useCallback(
    async (args: U) => {
      setState({
        loading: true,
        error: null,
        success: false,
        data: null,
      })

      try {
        const data = await asyncFn(args)
        setState({
          loading: false,
          error: null,
          success: true,
          data,
        })
      } catch (err) {
        const errorString = manageErr
          ? manageErr(err)
          : 'Request failed. Please try again.'
        setState({
          loading: false,
          error: errorString,
          success: false,
          data: null,
        })
      }
    },
    [asyncFn, manageErr],
  )

  return { ...state, callAsyncFn }
}
