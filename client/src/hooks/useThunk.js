import { useMemo } from 'react'

const createThunkableDispatch = dispatch => action => {
  if (typeof action === 'function') {
    return action(dispatch)
  } else {
    return dispatch(action)
  }
}

function useThunk(useReducerResult) {
  const [state, dispatch] = useReducerResult
  return useMemo(() => [state, createThunkableDispatch(dispatch)], [
    dispatch,
    state
  ])
}

export default useThunk
