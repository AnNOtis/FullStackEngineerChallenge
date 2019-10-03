import React from 'react'
import ReactDOM from 'react-dom'
import AuthContextProvider from '@/contexts/AuthContext/AuthContextProvider'
import App from './App'

const mountNode = document.getElementById('app')
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  mountNode
)
