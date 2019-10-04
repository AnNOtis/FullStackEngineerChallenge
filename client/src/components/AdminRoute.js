import React from 'react'
import PropTypes from 'prop-types'
import { Route, useLocation, Redirect } from 'react-router-dom'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'

function AdminRoute({ component: Component, ...rest }) {
  const location = useLocation()
  const [{ user }] = useAuthContext()

  if (!user || !user.isAdmin) {
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
AdminRoute.propTypes = {
  component: PropTypes.elementType
}

export default AdminRoute
