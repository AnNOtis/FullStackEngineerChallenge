import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import useThunk from '@/hooks/useThunk'
import AuthContext from './Context'

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { user: action.payload.user }
    case 'auth':
      return { user: action.payload.user }
    case 'logout':
      return { user: undefined }
    default:
      throw new TypeError('No matched type')
  }
}

function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={useThunk(useReducer(reducer, {}))}>
      {children}
    </AuthContext.Provider>
  )
}
AuthContextProvider.propTypes = {
  children: PropTypes.node
}

export default AuthContextProvider
