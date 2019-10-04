import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import NoSsr from '@material-ui/core/NoSsr'
import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blueGrey[800]
    }
  }
})

function MaterialThemeProvider({ children }) {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  )
}
MaterialThemeProvider.propTypes = {
  children: PropTypes.node
}

export default MaterialThemeProvider
