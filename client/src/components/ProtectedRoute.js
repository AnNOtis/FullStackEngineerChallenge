import React from 'react'
import PropTypes from 'prop-types'
import { Route, useLocation, Redirect } from 'react-router-dom'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'

function ProtectedRoute({ component: Component, ...rest }) {
  const location = useLocation()
  const { user } = useAuthContext()
  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }

  return <Route {...rest} component={Component} />
}
ProtectedRoute.propTypes = {
  component: PropTypes.elementType
}

export default ProtectedRoute
