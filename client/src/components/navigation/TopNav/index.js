import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';

const links = [
  {
    key: 'search',
    to: '/search',
    text: 'Track Search'
  },
  {
    key: 'upload',
    to: '/upload',
    text: 'Upload Tracks'
  },
]

const TopNav = ({location}) => {
  const [menuAnchor, setMenuAnchor] = useState()
  console.log(location)

  const handleMenuToggle = (e) => {
    setMenuAnchor(menuAnchor ? null : e.currentTarget)
  }

  const handleMenuClose = () => setMenuAnchor(null);

  const menu = (
    // To handle position of menu opening see:
    // https://material-ui.com/components/menus/#menulist-composition
    <Menu
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {links.map(({key, to, text}) => (
          <MenuItem key={key}>
            <Link to={to}>
              <Typography>
                {text}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuToggle}>
          <MenuIcon />
          {menu}
        </IconButton>
        <Typography variant="h6">
          Indy's DJ Track Database
        </Typography>
        {/* @TODO: User / Logout */}
      </Toolbar>
    </AppBar>
  )
}
export default TopNav;