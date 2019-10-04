import React from 'react'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  myAssignmentsPath,
  adminReviewSessionsPath,
  loginPath
} from '@/helpers/linkHelpers'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import ListItemLink from './ListItemLink'
import SubTitle from './SubTitle'

const StyledList = styled(List)`
  width: 250px;
  max-width: 100%;
  background-color: ${props => props.theme.palette.background.paper};
`

function Sidebar({ open = false, onClose = () => {} }) {
  const [{ user }, dispatch] = useAuthContext()

  const meLinks = (
    <>
      <SubTitle>Me</SubTitle>
      <ListItemLink primary="My assignments" to={myAssignmentsPath()} />
    </>
  )

  const adminLinks = (
    <>
      <SubTitle>Admin</SubTitle>
      <ListItemLink
        primary="Performace review"
        to={adminReviewSessionsPath()}
      />
    </>
  )

  const otherLinks = (
    <>
      <SubTitle>Others</SubTitle>
      <ListItemLink
        primary={user ? 'Change account' : 'Log in'}
        to={loginPath()}
      />
      {user && (
        <ListItem button onClick={() => dispatch({ type: 'logout' })}>
          <ListItemText primary="Log out" />
        </ListItem>
      )}
    </>
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
