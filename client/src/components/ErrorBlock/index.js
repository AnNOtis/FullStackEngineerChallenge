import React from 'react'
import { get } from 'lodash'
import { Typography } from '@material-ui/core'

function ErrorBlock({ error }) {
  return (
    <Typography variant="caption" color="error">
      {get(error, 'response.data.error.message') || error.toString()}
    </Typography>
  )
}

export default ErrorBlock
