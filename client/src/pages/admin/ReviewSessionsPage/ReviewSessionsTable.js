import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Edit as EditIcon } from '@material-ui/icons'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@material-ui/core'
import { adminReviewSessionPath } from '@/helpers/linkHelpers'
import { formatDate } from '@/utils'
import TableSkeleton from '@/components/TableSkeleton'
import ReviewSessionStatus from '@/components/ReviewSessionStatus'
import EditDialog from './EditDialog'

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`

function ReviewSessionsTable({ loading, reviewSessions, onSuccess }) {
  const history = useHistory()
  const [editingSession, setEditingSession] = useState(null)

  if (loading) return <TableSkeleton />

  const handleRowClick = id => {
    history.push(adminReviewSessionPath(id))
  }

  const handleEdit = session => e => {
    e.stopPropagation()
    setEditingSession(session)
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell align="right" />
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
              <TableCell align="right">
                <IconButton onClick={handleEdit(session)}>
                  <EditIcon color="primary" />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {editingSession && (
        <EditDialog
          open={!!editingSession}
          onClose={() => setEditingSession(null)}
          onSuccess={onSuccess}
          reviewSession={editingSession}
        />
      )}
    </>
  )
}

ReviewSessionsTable.propTypes = {
  loading: PropTypes.bool,
  reviewSessions: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func
}

export default ReviewSessionsTable
