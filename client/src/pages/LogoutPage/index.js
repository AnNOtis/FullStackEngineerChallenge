import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import { loginPath } from '@/helpers/linkHelpers'
import * as apis from '@/apis/public'
import useFetcher from '@/hooks/useFetcher'

function LogoutPage() {
  const history = useHistory()
  const [, dispatch] = useAuthContext()
  const { trigger: requestLogout } = useFetcher(apis.logout)

  useEffect(() => {
    requestLogout().then(() => {
      dispatch({ type: 'logout' })
      history.replace(loginPath())
    })
  }, [dispatch, history, requestLogout])

  return null
}

export default LogoutPage
