import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from '@material-ui/core'

function ListItemLink(props) {
  const { primary, to } = props

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef((itemProps, ref) => <Link to={to} {...itemProps} ref={ref} />),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

ListItemLink.propTypes = {
  primary: PropTypes.string,
  to: PropTypes.string
}

export default ListItemLink
