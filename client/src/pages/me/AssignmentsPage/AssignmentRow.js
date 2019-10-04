import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell, Avatar, Chip } from '@material-ui/core'
import { Done as DoneIcon } from '@material-ui/icons'
import styled from 'styled-components'
import { format } from 'date-fns'
import { REVIEW_SESSION_STATUS } from '@/constants'

function formatDate(dateString) {
  return format(new Date(dateString), 'yyyy-MM-dd')
}

const StyledAvatar = styled(Avatar)`
  display: inline-block;
  margin-right: ${props => props.theme.spacing(1)}px;
`

const UserCell = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`

const statusElementMap = {
  [REVIEW_SESSION_STATUS.upcomming]: (
    <Chip size="small" variant="outlined" label="upcomming" />
  ),
  [REVIEW_SESSION_STATUS.expired]: (
    <Chip size="small" variant="outlined" label="expired" />
  ),
  [REVIEW_SESSION_STATUS.current]: (
    <Chip size="small" variant="outlined" color="primary" label="current" />
  )
}

function AssignmentRow({ assignment, onClick }) {
  const { id, reviewee, reviewSession: session, isSubmitted } = assignment

  return (
    <TableRow hover onClick={() => onClick(id)}>
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
      <TableCell align="right">{statusElementMap[session.status]}</TableCell>
    </TableRow>
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
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    isSubmitted: PropTypes.bool
  }),
  onClick: PropTypes.func
}

export default AssignmentRow
