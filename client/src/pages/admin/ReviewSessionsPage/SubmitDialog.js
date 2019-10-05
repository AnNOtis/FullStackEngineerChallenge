import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import ErrorBlock from '@/components/ErrorBlock'
import useFetcher from '@/hooks/useFetcher'
import * as apis from '@/apis/admin'
import { startOfDay, endOfDay } from 'date-fns'

function SubmitDialog({
  open = false,
  onClose = () => {},
  onSuccess = () => {},
  headText = 'Create a review session',
  api = apis.createReviewSession,
  submitText = 'Create',
  initialState = { title: '', startAt: Date.now(), endAt: null }
}) {
  const { loading, error, trigger: submitReviewSession } = useFetcher(api, {
    manual: true
  })
  const [title, setTitle] = useState(initialState.title)
  const [startAt, setStartAt] = useState(initialState.startAt)
  const [endAt, setEndAt] = useState(initialState.endAt)

  const handleSubmit = () => {
    submitReviewSession({
      id: initialState.id,
      title,
      startAt: startAt && startOfDay(new Date(startAt)).toISOString(),
      endAt: endAt && endOfDay(new Date(endAt)).toISOString()
    }).then(() => {
      onClose()
      onSuccess()
    })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{headText}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error && <ErrorBlock error={error} />}
        </DialogContentText>
        <TextField
          fullWidth
          required
          label="Title"
          margin="normal"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <KeyboardDatePicker
          fullWidth
          required
          margin="normal"
          label="Start at"
          format="yyyy/MM/dd"
          value={startAt}
          onChange={setStartAt}
          maxDate={endAt}
        />
        <KeyboardDatePicker
          fullWidth
          required
          margin="normal"
          label="End at"
          format="yyyy/MM/dd"
          value={endAt}
          onChange={setEndAt}
          minDate={startAt}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SubmitDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  headText: PropTypes.string,
  api: PropTypes.func,
  submitText: PropTypes.string,
  initialState: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    startAt: PropTypes.string,
    endAt: PropTypes.string
  })
}

export default SubmitDialog
