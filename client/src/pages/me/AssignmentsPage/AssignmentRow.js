import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell, Avatar } from '@material-ui/core'
import { Done as DoneIcon } from '@material-ui/icons'
import styled from 'styled-components'
import { formatDate } from '@/utils'
import ReviewSessionStatus from '@/components/ReviewSessionStatus'

const StyledAvatar = styled(Avatar)`
  display: inline-block;
  margin-right: ${props => props.theme.spacing(1)}px;
`

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`

const UserCell = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`

function AssignmentRow({ assignment, onClick }) {
  const { id, reviewee, reviewSession: session, isSubmitted } = assignment

  return (
    <StyledTableRow hover onClick={() => onClick(id)}>
      <TableCell component="th" scope="row">
        {session.title}
      </TableCell>
      <TableCell align="center">
        {isSubmitted ? <DoneIcon color="primary" /> : 'No'}
      </TableCell>
      <TableCell component="th" scope="row">
        <UserCell>
          <StyledAvatar alt={reviewee.name} src={reviewee.avatarUrl} />
          {reviewee.name}
        </UserCell>
      </TableCell>
      <TableCell align="right">{formatDate(session.startAt)}</TableCell>
      <TableCell align="right">{formatDate(session.endAt)}</TableCell>
      <TableCell align="right">
        <ReviewSessionStatus reviewSession={session} />
      </TableCell>
    </StyledTableRow>
  )
}

AssignmentRow.propTypes = {
  assignment: PropTypes.shape({
    reviewSession: PropTypes.shape({
      startAt: PropTypes.string,
      endAt: PropTypes.string
    }),
    reviewee: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
      email: PropTypes.string
    }),
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    isSubmitted: PropTypes.bool
  }),
  onClick: PropTypes.func
}

export default AssignmentRow
