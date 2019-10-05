import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import { Menu as MenuIcon, Lock as LockIcon } from '@material-ui/icons'
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Box,
  IconButton,
  Chip
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '@/components/Sidebar'
import UserButton from './UserButton'

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
})

function MainLayout({ children }) {
  let isAdminPage = useRouteMatch('/admin')
  const [isSidebarOpen, setSidebar] = useState(false)
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static" color={isAdminPage ? 'secondary' : 'primary'}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => {
              setSidebar(state => !state)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Performance Review{' '}
            {isAdminPage && (
              <Chip
                icon={<LockIcon />}
                label="Admin console"
                color="secondary"
              />
            )}
          </Typography>
          <UserButton />
        </Toolbar>
      </AppBar>
      <>
        <Container maxWidth="md">
          <Box pt={2} pb={8}>
            {children}
          </Box>
        </Container>
        <Sidebar open={isSidebarOpen} onClose={() => setSidebar(false)} />
      </>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
