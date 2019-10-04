import { useEffect, useState } from 'react'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import * as apis from '@/apis/public'

let isTriggered = false

function useInitialAuth() {
  const [isAuth, setIsAuth] = useState(isTriggered)
  const [, dispatch] = useAuthContext()

  useEffect(() => {
    if (isTriggered) return
    isTriggered = true

    apis
      .auth()
      .then(res => {
        dispatch({ type: 'auth', payload: res.data })
      })
      .finally(() => {
        setIsAuth(true)
      })
  }, [dispatch])

  return isAuth
}

export default useInitialAuth
