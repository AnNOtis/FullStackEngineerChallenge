import { useContext } from 'react'
import Context from './Context'

function useAuthContext() {
  return useContext(Context)
}

export default useAuthContext
