import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Paper, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'
import { get } from 'lodash'
import useFetcher from '@/hooks/useFetcher'
import * as apis from '@/apis/admin'
import ReviewSessionsTable from './ReviewSessionsTable'
import CreateDialog from './CreateDialog'

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(4)}px;
`

const StyledFab = styled(Fab)`
  float: right;
`

function ReviewSessionsPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const { result, loading, trigger: reload } = useFetcher(
    apis.getReviewSessions
  )
  const reviewSessions = get(result, 'data.reviewSessions', [])

  const toggleCreateDialog = () => {
    setOpenCreateDialog(state => !state)
  }

  return (
    <Wrapper>
      <Typography variant="h4">Review Session List</Typography>
      <StyledFab color="primary" onClick={toggleCreateDialog}>
        <AddIcon />
      </StyledFab>
      <Paper>
        <Box mt={4}>
          <ReviewSessionsTable
            reviewSessions={reviewSessions}
            loading={loading}
            onSuccess={reload}
          />
        </Box>
      </Paper>
      <CreateDialog
        key={reviewSessions.length}
        open={openCreateDialog}
        onClose={toggleCreateDialog}
        onSuccess={reload}
      />
    </Wrapper>
  )
}

ReviewSessionsPage.propTypes = {}

export default ReviewSessionsPage
