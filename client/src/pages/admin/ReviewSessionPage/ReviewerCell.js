import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, Button } from '@material-ui/core'
import styled from 'styled-components'
import * as apis from '@/apis/admin'
import useFetcher from '@/hooks/useFetcher'
import { REVIEW_SESSION_STATUS } from '@/constants'

const StyledSelect = styled(Select)`
  width: 240px;
  margin-right: ${getThemeProps => getThemeProps.theme.spacing(2)}px;
`

function getDisplayName(user) {
  return `${user.name} (${user.email})`
}

function ReviewerCell({ reviewSession, review, allUsers }) {
  const { reviewer, reviewee } = review
  const [remoteReviewerId, setRemoteReviewerId] = useState(
    reviewer && reviewer.id
  )
  const [reviewerId, setReviewerId] = useState(remoteReviewerId)
  const { trigger: updateReviewer, loading, error } = useFetcher(
    apis.updateAssignment,
    {
      manual: true
    }
  )

  if (
    reviewSession.status === REVIEW_SESSION_STATUS.expired ||
    review.isSubmitted
  ) {
    return getDisplayName(reviewer)
  }

  const handleReviewerChange = e => {
    setReviewerId(e.target.value)
  }

  const handleUpdateReviewer = () => {
    updateReviewer(reviewSession.id, reviewee.id, reviewerId).then(res => {
      const id = res.data.review.reviewerId
      setReviewerId(id)
      setRemoteReviewerId(id)
    })
  }

  return (
    <>
      <StyledSelect
        error={!!error}
        onChange={handleReviewerChange}
        value={reviewerId}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allUsers
          .filter(u => u.id !== reviewee.id)
          .map(user => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {getDisplayName(user)}
              </MenuItem>
            )
          })}
      </StyledSelect>
      <Button
        size="small"
        disabled={reviewerId === remoteReviewerId || loading}
        color="primary"
        variant="contained"
        onClick={handleUpdateReviewer}
      >
        Update
      </Button>
    </>
  )
}

ReviewerCell.propTypes = {
  reviewSession: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.oneOf(Object.values(REVIEW_SESSION_STATUS))
  }),
  review: PropTypes.shape({
    isSubmitted: PropTypes.bool,
    reviewee: PropTypes.shape({
      id: PropTypes.number
    }),
    reviewer: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  allUsers: PropTypes.arrayOf(PropTypes.shape({}))
}

export default ReviewerCell
