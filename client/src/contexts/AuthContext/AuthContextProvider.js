import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import AuthContext from './Context'

function reducer(state, action) {
  switch (action.type) {
    case 'auth':
      return { user: action.payload.user }
    default:
      throw new TypeError('No matched type')
  }
}

function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={useReducer(reducer, { user: null })}>
      {children}
    </AuthContext.Provider>
  )
}
AuthContextProvider.propTypes = {
  children: PropTypes.node
}

export default AuthContextProvider
