import React from 'react'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  myAssignmentsPath,
  adminReviewSessionsPath,
  loginPath,
  logoutPath
} from '@/helpers/linkHelpers'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import ListItemLink from './ListItemLink'
import SubTitle from './SubTitle'

const StyledList = styled(List)`
  width: 250px;
  max-width: 100%;
  background-color: ${props => props.theme.palette.background.paper};
  > * + * {
    margin-top: ${props => props.theme.spacing(4)}px;
  }
`

function Sidebar({ open = false, onClose = () => {} }) {
  const history = useHistory()
  const [{ user }] = useAuthContext()

  const meLinks = (
    <div>
      <SubTitle>Me</SubTitle>
      <ListItemLink primary="My assignments" to={myAssignmentsPath()} />
    </div>
  )

  const adminLinks = (
    <div>
      <SubTitle>Admin</SubTitle>
      <ListItemLink
        primary="Review session list"
        to={adminReviewSessionsPath()}
      />
    </div>
  )

  const otherLinks = (
    <div>
      <SubTitle>Others</SubTitle>
      <ListItemLink
        primary={user ? 'Change account' : 'Log in'}
        to={loginPath()}
      />
      {user && (
        <ListItem button onClick={() => history.push(logoutPath())}>
          <ListItemText primary="Log out" />
        </ListItem>
      )}
    </div>
  )
  return (
    <Drawer open={open} onClose={onClose} onClick={onClose}>
      <StyledList>
        {user && meLinks}
        {user && user.isAdmin && adminLinks}
        {otherLinks}
      </StyledList>
    </Drawer>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default Sidebar
