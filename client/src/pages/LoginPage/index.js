import React from 'react'
import { Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import * as apis from '@/apis/public'
import useFetcher from '@/hooks/useFetcher'

const Wrapper = styled.div`
  > * + * {
    margin-left: ${props => props.theme.spacing(1)}px;
  }
`

function LoginPage() {
  const [, dispatch] = useAuthContext()
  const history = useHistory()
  const { state: { from } = {} } = useLocation()

  const login = (name, password) =>
    apis.login(name, password).then(res => {
      dispatch({ type: 'login', payload: res.data })
      history.push(from || '/')
    })

  const { error, loading, trigger: triggerLogin } = useFetcher(login, {
    manual: true
  })

  return (
    <Wrapper>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => triggerLogin('user1@example.com', '123123')}
      >
        Login as employee
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => triggerLogin('admin@example.com', '123123')}
      >
        Login as admin user
      </Button>
      {error && <Typography color="error">{error.toString()}</Typography>}
    </Wrapper>
  )
}

export default LoginPage
