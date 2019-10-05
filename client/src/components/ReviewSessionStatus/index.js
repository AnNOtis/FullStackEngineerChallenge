import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@material-ui/core'
import { REVIEW_SESSION_STATUS } from '@/constants'

const statusElementMap = {
  [REVIEW_SESSION_STATUS.upcoming]: (
    <Chip size="small" variant="outlined" label="upcoming" color="primary" />
  ),
  [REVIEW_SESSION_STATUS.expired]: (
    <Chip size="small" variant="outlined" label="expired" />
  ),
  [REVIEW_SESSION_STATUS.current]: (
    <Chip size="small" variant="default" color="primary" label="current" />
  )
}

function ReviewSessionStatus({ reviewSession }) {
  return statusElementMap[reviewSession.status] || null
}

ReviewSessionStatus.propTypes = {
  reviewSession: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(REVIEW_SESSION_STATUS))
  })
}

export default ReviewSessionStatus
