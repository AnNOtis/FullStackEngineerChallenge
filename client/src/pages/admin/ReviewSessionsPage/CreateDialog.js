import React from 'react'
import PropTypes from 'prop-types'
import * as apis from '@/apis/admin'
import SubmitDialog from './SubmitDialog'

function CreateDialog(props) {
  return (
    <SubmitDialog
      {...props}
      headText="Create a review session"
      api={apis.createReviewSession}
      submitText="Create"
    />
  )
}

CreateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
}

export default CreateDialog
