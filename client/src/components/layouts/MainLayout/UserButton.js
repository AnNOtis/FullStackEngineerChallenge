import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Avatar, Menu, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import useAuthContext from '@/contexts/AuthContext/useAuthContext'
import { loginPath, logoutPath } from '@/helpers/linkHelpers'

const StyledAvatar = styled(Avatar)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

function UserButton() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [{ user }] = useAuthContext()

  const toggleUserMenu = event => {
    setAnchorEl(state => (state ? null : event.currentTarget))
  }

  const redirectToLogin = () => {
    setAnchorEl(null)
    history.push(loginPath())
  }

  const handleLogout = () => {
    toggleUserMenu()
    history.push(logoutPath())
  }

  return (
    <>
      {user ? (
        <Button color="inherit" onClick={toggleUserMenu}>
          <StyledAvatar alt={user.name} src={user.avatarUrl} />
          {user.name}
        </Button>
      ) : (
        <Button color="inherit" onClick={redirectToLogin}>
          Login
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!anchorEl}
        onClose={toggleUserMenu}
      >
        <MenuItem onClick={redirectToLogin}>Change account</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  )
}

export default UserButton
