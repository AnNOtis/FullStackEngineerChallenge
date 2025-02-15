import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { get } from 'lodash'
import styled from 'styled-components'
import * as apis from '@/apis/me'
import useFetcher from '@/hooks/useFetcher'
import TableSkeleton from '@/components/TableSkeleton'
import AssignmentDialog from '@/components/AssignmentDialog'
import { REVIEW_SESSION_STATUS } from '@/constants'
import Assignments from './Assignments'

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(4)}px;
`

function sortByIdDesc(items) {
  return [...items].sort((a, b) => new Date(b.id) - new Date(a.id))
}

function getCurrentAssignments(assignments) {
  return assignments.filter(
    a => a.reviewSession.status !== REVIEW_SESSION_STATUS.expired
  )
}

function getPastAssignments(assignments) {
  return assignments.filter(
    a => a.reviewSession.status === REVIEW_SESSION_STATUS.expired
  )
}

function AssignmentsPage() {
  const [openDialogId, setOpenDialogId] = useState(null)
  const { result, loading, trigger: refetch } = useFetcher(apis.getAssignments)
  const assignments = sortByIdDesc(get(result, 'data.assignments', []))

  const currentAssignments = getCurrentAssignments(assignments)
  const pastAssignments = getPastAssignments(assignments)

  return (
    <Wrapper>
      <Typography variant="h4">My assignments</Typography>
      <Box mt={4}>
        <Typography variant="subtitle1" color="textSecondary">
          Current reviews
        </Typography>
        {loading ? (
          <TableSkeleton />
        ) : (
          <Assignments
            assignments={currentAssignments}
            onRowClick={setOpenDialogId}
          />
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle1" color="textSecondary">
          Past reviews
        </Typography>
        {loading ? (
          <TableSkeleton />
        ) : (
          <Assignments
            assignments={pastAssignments}
            onRowClick={setOpenDialogId}
          />
        )}
      </Box>

      {openDialogId && (
        <AssignmentDialog
          id={openDialogId}
          onClose={() => {
            setOpenDialogId(null)
          }}
          onSubmitSuccess={refetch}
        />
      )}
    </Wrapper>
  )
}

export default AssignmentsPage
