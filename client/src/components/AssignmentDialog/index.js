import React from 'react'
import PropTypes from 'prop-types'
import useFetcher from '@/hooks/useFetcher'
import { get } from 'lodash'
import { REVIEW_SESSION_STATUS } from '@/constants'
import * as apis from '@/apis/me'
import DetailDialog from './DetailDialog'
import EditDialog from './EditDialog'

function AssignmentDialog({
  id,
  forceDetail = false,
  onClose = () => {},
  onSubmitSuccess = () => {}
}) {
  const { result, loading } = useFetcher(apis.getAssignment, { args: [id] })
  if (loading) return null

  const assignment = get(result, 'data.assignment')
  const displayDetail =
    forceDetail ||
    assignment.reviewSession.status === REVIEW_SESSION_STATUS.expired ||
    assignment.isSubmitted

  return displayDetail ? (
    <DetailDialog assignment={assignment} onClose={onClose} />
  ) : (
    <EditDialog
      assignment={assignment}
      onClose={onClose}
      onSubmitSuccess={onSubmitSuccess}
    />
  )
}

AssignmentDialog.propTypes = {
  id: PropTypes.string,
  forceDetail: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func
}

export default AssignmentDialog
