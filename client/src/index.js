import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from '@/contexts/AuthContext/AuthContextProvider'
import MaterialThemeProvider from '@/components/MaterialThemeProvider'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/styles'
import App from './App'

const mountNode = document.getElementById('app')
ReactDOM.render(
  <BrowserRouter>
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MaterialThemeProvider>
          <AuthContextProvider>
            <CssBaseline />
            <App />
          </AuthContextProvider>
        </MaterialThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  </BrowserRouter>,
  mountNode
)
