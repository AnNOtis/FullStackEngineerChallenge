import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Box,
  IconButton
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
  const [isSidebarOpen, setSidebar] = useState(false)
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static">
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
            Performance Review
          </Typography>
          <UserButton />
        </Toolbar>
      </AppBar>
      <>
        <Container maxWidth="md" py={2}>
          <Box py={1}>{children}</Box>
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
