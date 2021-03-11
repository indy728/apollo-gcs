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
import { FlexSpacer, InlineBrand } from 'components/ui';
import { useMutation } from '@apollo/client';
import { FB_LOGOUT_USER, CHECK_AUTH } from 'components/apollo';

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

const HeaderItems = styled.div`
  background-color: ${({theme: {primary}}) => primary[0]};
  height: 10rem;
  display: flex;
  align-items: center;
`

const HeaderItem = styled.div`
  padding: 0 1rem;
  border: 1px solid white;
`;

const HeaderNav = styled.header`
`;

const TopNav = () => {
  const [menuAnchor, setMenuAnchor] = useState()
  const [signOut, {loading, error}] = useMutation(FB_LOGOUT_USER, {
    refetchQueries: [{query: CHECK_AUTH}]
  });

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
    <HeaderNav>
      <HeaderItems>
        <HeaderItem>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuToggle}>
            <MenuIcon />
            {menu}
          </IconButton>
        </HeaderItem>
        <HeaderItem>
          <Typography variant="h6">
            <InlineBrand />
          </Typography>
        </HeaderItem>
        <FlexSpacer />
        {/* @TODO: User / Logout */}
        <HeaderItem>
          
        </HeaderItem>
        <HeaderItem>
          <div onClick={signOut}>
            <Typography>
              logout
            </Typography>
          </div>
        </HeaderItem>
      </HeaderItems>
    </HeaderNav>
  )
}
export default TopNav;