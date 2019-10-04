import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core'
import AssignmentRow from './AssignmentRow'

function Assignments({ assignments, onRowClick }) {
  if (!assignments.length) {
    return (
      <Typography variant="caption" color="grey">
        You have no assignment.
      </Typography>
    )
  }
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Session</TableCell>
            <TableCell align="right">Submitted</TableCell>
            <TableCell>Reviewee</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map(assignment => (
            <AssignmentRow
              key={assignment.id}
              assignment={assignment}
              onClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(PropTypes.shape({})),
  onRowClick: PropTypes.func
}

export default Assignments
