import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import NoSsr from '@material-ui/core/NoSsr'
import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()

function MaterialThemeProvider({ children }) {
  return (
    <NoSsr>
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </NoSsr>
  )
}
MaterialThemeProvider.propTypes = {
  children: PropTypes.node
}

export default MaterialThemeProvider
