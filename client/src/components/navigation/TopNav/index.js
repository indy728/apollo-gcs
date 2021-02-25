import React, {useState} from 'react';
import styled from 'styled-components';
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

const StyledToolbar = styled(Toolbar)`
  background-color: ${({theme: {primary}}) => primary[0]};
  height: 10rem;
  
  && {
    * {
      font-size: 2.8rem;
      font-family: 'Gugi', serif !important;
    }
  }
`

const TopNav = () => {
  const [menuAnchor, setMenuAnchor] = useState()

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
      <StyledToolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuToggle}>
          <MenuIcon />
          {menu}
        </IconButton>
        <Typography variant="h6">
          meatport
        </Typography>
        {/* @TODO: User / Logout */}
      </StyledToolbar>
    </AppBar>
  )
}
export default TopNav;