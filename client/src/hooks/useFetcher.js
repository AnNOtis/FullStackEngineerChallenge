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

/**
 * "useFetcher" is a hook for extracting repetitive logics of handling async actions.
 *
 * Here is an usage example:
 *
 *     function SearchResult ({ term }) {
 *       const {loading, error, result } = useFetch(seachAPI, { args: [term] })
 *       if (error) {
 *         return error.toString()
 *       }
 *
 *       if (loading) {
 *         return 'Loading...'
 *       }
 *
 *       return <>
 *         {JSON.stringify(result, null, 2)}
 *       </>
 *     }
 *
 * When <SearchResult> is mounted or props.term is changed, searchAPI will be called with props.term.
 * You can use the return values of useFetch to render your component.
 *
 * @param {function} fetcher - The target async action. The return value should be wrapped in promise.
 * @param {Object} options
 * @param {boolean} options.manual -
 *      Default is false. When set to true, the fetcher won't be executed automatically.
 * @param {boolean} options.args -
 *      It will be passed to async function when an automatic excution happens
 *
 * @returns {Object} asyncState
 * @returns {} asyncState.result - result of the execution of the fetcher
 * @returns {} asyncState.error - error of the execution of the fetcher. will be reset when an execution starts.
 * @returns {bool} asyncState.loading - true if a execution is continuing
 * @returns {function} asyncState.trigger - can be called to execute the fetcher.
 *    it's useful when options.manual is set to true
 */
const useFetcher = (fetcher, { manual = false, args = [] } = {}) => {
  const [{ loading, result, error }, dispatch] = useReducer(reducer, {
    loading: !manual,
    result: undefined,
    error: undefined
  })
  const mounted = useIsMounted()
  const cancelLast = useRef(() => {})

  const trigger = useCallback(
    (...manualArgs) => {
      // override options.args if trigger is called with arguments
      const actualArgs = manualArgs.length ? manualArgs : args

      let isCancelled = false
      cancelLast.current()
      cancelLast.current = () => {
        isCancelled = true
      }

      dispatch({ type: 'start' })

      return fetcher(...actualArgs)
        .then(data => {
          // When an execution happends, prevent previous executions to continue.
          if (!mounted.current || isCancelled) return
          dispatch({ type: 'succeed', payload: data })
          return data
        })
        .catch(errorMsg => {
          if (!mounted.current || isCancelled) return

          dispatch({ type: 'failed', payload: errorMsg })
          return Promise.reject(errorMsg)
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

export default useFetcher
