import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

function DetailDialog({ assignment, onClose }) {
  const { reviewee, content } = assignment

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        Your feedback for {reviewee.name} ({reviewee.email})
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Your feedback"
          multiline
          margin="normal"
          rows={2}
          rowsMax={10}
          value={content}
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DetailDialog.propTypes = {
  assignment: PropTypes.shape({
    reviewee: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string
    }),
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    content: PropTypes.string
  }),
  onClose: PropTypes.func
}

export default DetailDialog
