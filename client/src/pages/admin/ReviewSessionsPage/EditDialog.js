import React from 'react'
import PropTypes from 'prop-types'
import * as apis from '@/apis/admin'
import SubmitDialog from './SubmitDialog'

function EditDialog({ reviewSession, ...rest }) {
  return (
    <SubmitDialog
      {...rest}
      headText="Update a review session"
      api={session => apis.updateReviewSession(session.id, session)}
      submitText="Update"
      initialState={reviewSession}
    />
  )
}

EditDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  reviewSession: PropTypes.shape({})
}

export default EditDialog
