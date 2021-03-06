import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, withRouter, NavLink} from 'react-router-dom';
import { FlexSpacer, InlineBrand, Typography } from 'components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { FB_LOGOUT_USER, CHECK_AUTH } from 'components/apollo';
import {RolesEnum} from 'global';

const links = (user) => ({
  'search': {
    to: '/search',
    text: 'Track Search'
  },
  'upload': {
    to: '/upload',
    text: 'Upload Tracks'
  },
  'logout': {
    to: '/logout',
    text: 'Sign out'
  },
  'user': {
    to: '/user',
    text: `Hi, ${user}!`
  },
});

const HeaderItems = styled.div`
  /* background-color: ${({theme: {primary}}) => primary[0]}; */
  height: 10rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  max-width: 1232px;
`

const HeaderItem = styled.div`
  padding: 0 1rem;
  /* border: 1px solid white; */
  
  a {
    text-decoration: none;
    transition: all .1s linear;


    &.navlink-active p {
      color: ${({theme: {primary}}) => primary[3]};
    }

    &:not(.navlink-active) div:hover {
      cursor: pointer;
    }
  }

`;

const HeaderNav = styled.header`
`;

const TopNav = () => {
  const [menuAnchor, setMenuAnchor] = useState()
  const {loading, data, error} = useQuery(CHECK_AUTH);
  console.log('[index] data: ', data)
  const [signOut, {}] = useMutation(FB_LOGOUT_USER, {
    refetchQueries: [{query: CHECK_AUTH}]
  });
  let menu = null

  if (loading) {
    menu = loading
  } else if (error || (!loading && (!data.checkAuth))) {
    signOut()
  } else {
    const {username, email} = data.checkAuth;


    menu = (
      <ul style={{display: 'flex', listStyleType: 'none'}}>
        {Object.entries(links(username)).map(([key, {to, text}]) => (
          <li>
          <HeaderItem key={key}>
            <NavLink to={to} activeClassName="navlink-active">
              <Typography>
                {text}
              </Typography>
            </NavLink>
          </HeaderItem>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <HeaderNav>
      <HeaderItems>
        <HeaderItem>
          <Typography fontSize="2.8rem">
            <InlineBrand />
          </Typography>
        </HeaderItem>
        <FlexSpacer />
        {/* @TODO: User / Logout */}
        {menu}
      </HeaderItems>
    </HeaderNav>
  )
}
export default TopNav;