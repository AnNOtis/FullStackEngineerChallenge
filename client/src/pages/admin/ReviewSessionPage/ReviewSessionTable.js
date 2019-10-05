import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import ReviewerCell from './ReviewerCell'
import SubmittedCell from './SubmittedCell'

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`

function ReviewSessionTable({ reviewSession }) {
  const reviews = reviewSession.reviews
  const allUsers = reviews.map(r => r.reviewee)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>reviwee</TableCell>
          <TableCell>reviewers</TableCell>
          <TableCell align="center">Submitted</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reviews.map(review => (
          <StyledTableRow hover key={review.reviewee.id} onClick={() => {}}>
            <TableCell component="th" scope="row">
              {review.reviewee.name} ({review.reviewee.email})
            </TableCell>
            <TableCell>
              <ReviewerCell
                reviewSession={reviewSession}
                review={review}
                allUsers={allUsers}
              />
            </TableCell>
            <TableCell align="center">
              <SubmittedCell review={review} />
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

ReviewSessionTable.propTypes = {
  reviewSession: PropTypes.shape({
    reviews: PropTypes.arrayOf(PropTypes.shape({}))
  })
}

export default ReviewSessionTable
