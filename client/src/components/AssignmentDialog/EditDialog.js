import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core'
import { debounce } from 'lodash'
import {
  getAssignmentContent,
  setAssignmentContent,
  removeAssignmentContent
} from '@/helpers/localStorageHelpers'
import useFetcher from '@/hooks/useFetcher'
import * as apis from '@/apis/me'

const debouncedSetAssignmentContent = debounce(setAssignmentContent, 1000)

function EditDialog({ assignment, onClose, onSubmitSuccess }) {
  const { id, reviewee } = assignment
  const [content, setContent] = useState(getAssignmentContent(id) || '')
  const { trigger: submit, loading, error } = useFetcher(
    apis.submitAssignment,
    {
      manual: true
    }
  )

  const handleContentChange = e => {
    const value = e.target.value
    debouncedSetAssignmentContent(id, value)
    setContent(value)
  }

  const handleSubmit = () => {
    submit(id, content).then(() => {
      removeAssignmentContent(id)
      onClose()
      onSubmitSuccess()
    })
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Submit your feedback</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We sincerely invited you to write down the feedback for your colleage{' '}
          <strong>
            {reviewee.name} ({reviewee.email})
          </strong>
          . Thanks for your time.
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          label="Your feedback"
          multiline
          margin="normal"
          rows={2}
          rowsMax={10}
          value={content}
          onChange={handleContentChange}
          error={error}
          disabled={loading}
        />
        {error && (
          <Typography variant="caption" color="error">
            {error.toString()}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" disabled={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditDialog.propTypes = {
  assignment: PropTypes.shape({
    reviewee: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string
    }),
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  }),
  onClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func
}

export default EditDialog
