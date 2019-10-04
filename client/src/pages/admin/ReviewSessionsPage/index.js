import React from 'react'
import { Paper, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'

import ReviewSessionsTable from './ReviewSessionsTable'

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(4)}px;
`

function ReviewSessionsPage() {
  return (
    <Wrapper>
      <Typography variant="h2" color="h2">
        Review Sessions
      </Typography>
      <Paper>
        <Box mt={2}>
          <ReviewSessionsTable />
        </Box>
      </Paper>
    </Wrapper>
  )
}

ReviewSessionsPage.propTypes = {}

export default ReviewSessionsPage
