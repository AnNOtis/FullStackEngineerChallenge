import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Dialog,
  IconButton,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  Typography
} from '@material-ui/core'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

const Content = styled(Typography)`
  width: 300px;
  white-space: pre-wrap;
`

function SubmittedCell({ review }) {
  const [contentOpen, setContentOpen] = useState(false)

  const toggleContent = () => {
    setContentOpen(state => !state)
  }

  return review.isSubmitted ? (
    <>
      <IconButton onClick={toggleContent}>
        <DescriptionOutlinedIcon color="primary" />
      </IconButton>
      <Dialog open={contentOpen} onClose={toggleContent}>
        <DialogTitle>Feedback for {review.reviewee.name}</DialogTitle>
        <DialogContent>
          <Content variant="body1">{review.content}</Content>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleContent}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    'No'
  )
}

SubmittedCell.propTypes = {
  review: PropTypes.shape({
    isSubmitted: PropTypes.bool,
    reviewee: PropTypes.shape({
      name: PropTypes.string
    }),
    content: PropTypes.string
  })
}

export default SubmittedCell
