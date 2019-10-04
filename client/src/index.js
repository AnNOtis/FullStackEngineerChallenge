import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from '@/contexts/AuthContext/AuthContextProvider'
import MaterialThemeProvider from '@/components/MaterialThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'

const mountNode = document.getElementById('app')
ReactDOM.render(
  <BrowserRouter>
    <MaterialThemeProvider>
      <AuthContextProvider>
        <CssBaseline />
        <App />
      </AuthContextProvider>
    </MaterialThemeProvider>
  </BrowserRouter>,
  mountNode
)
