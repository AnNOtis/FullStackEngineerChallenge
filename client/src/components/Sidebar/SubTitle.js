import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'

function SubTitle({ children }) {
  return (
    <Box pl={1}>
      <Typography color="textSecondary" display="block" variant="subtitle1">
        {children}
      </Typography>
    </Box>
  )
}
SubTitle.propTypes = {
  children: PropTypes.node
}

export default SubTitle
