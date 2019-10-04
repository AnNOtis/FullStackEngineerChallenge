import { useEffect, useRef, useCallback, useReducer } from 'react'
import useIsMounted from '@/hooks/useIsMounted'

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, error: undefined, loading: true }
    case 'succeed':
      return {
        ...state,
        result: action.payload,
        error: undefined,
        loading: false
      }
    case 'failed':
      return { ...state, error: action.payload, loading: false }
    default:
      throw new TypeError('No matched type')
  }
}

const useAPI = (fetcher, { manual = false, args = [] } = {}) => {
  const [{ loading, result, error }, dispatch] = useReducer(reducer, {
    loading: !manual,
    result: undefined,
    error: undefined
  })
  const mounted = useIsMounted()
  const cancelLast = useRef(() => {})

  const trigger = useCallback(
    (...manualArgs) => {
      const actualArgs = manualArgs.length ? manualArgs : args

      let isCancelled = false
      cancelLast.current()
      cancelLast.current = () => {
        isCancelled = true
      }

      dispatch({ type: 'start' })

      return fetcher(...actualArgs)
        .then(data => {
          if (!mounted.current || isCancelled) return
          dispatch({ type: 'succeed', payload: data })
          return data
        })
        .catch(errorMsg => {
          if (!mounted.current || isCancelled) return
          dispatch({ type: 'failed', payload: errorMsg })
          throw errorMsg
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...args, fetcher, mounted]
  )

  useEffect(() => {
    if (!manual) {
      trigger()
    }
  }, [manual, trigger])

  return { result, error, loading, trigger }
}

export default useAPI
