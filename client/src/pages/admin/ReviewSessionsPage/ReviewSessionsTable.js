import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import { adminReviewSessionPath } from '@/helpers/linkHelpers'
import useFetcher from '@/hooks/useFetcher'
import * as apis from '@/apis/admin'
import { formatDate } from '@/utils'
import TableSkeleton from '@/components/TableSkeleton'
import ReviewSessionStatus from '@/components/ReviewSessionStatus'

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`

function ReviewSessionsTable() {
  const { result, loading } = useFetcher(apis.getReviewSessions)
  const history = useHistory()

  if (loading) return <TableSkeleton />
  const reviewSessions = result.data.reviewSessions

  const handleRowClick = id => {
    history.push(adminReviewSessionPath(id))
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align="right">Start</TableCell>
          <TableCell align="right">End</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {reviewSessions.map(session => (
          <StyledTableRow
            hover
            key={session.id}
            onClick={() => handleRowClick(session.id)}
          >
            <TableCell component="th" scope="row">
              {session.id}
            </TableCell>
            <TableCell component="th" scope="row">
              {session.title}
            </TableCell>
            <TableCell align="right">{formatDate(session.startAt)}</TableCell>
            <TableCell align="right">{formatDate(session.endAt)}</TableCell>
            <TableCell align="right">
              <ReviewSessionStatus reviewSession={session} />
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ReviewSessionsTable
