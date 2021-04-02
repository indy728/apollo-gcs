import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink, useHistory} from 'react-router-dom';
import { FlexSpacer, InlineBrand, Typography } from 'components/ui';
import {RolesEnum} from 'global';
import {useMeQuery} from 'generated/graphql';

import {actions} from 'store/slices';


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

const HeaderLinks = () => {
  const history = useHistory();

  const {loading, data, error} = useMeQuery({
    fetchPolicy: "network-only"
});
  
  if (loading) {
    return <div>...loading</div>
  }
  if (error || !data?.me) {
    history.push('/logout')
    console.log('[index] error: ', error)
    console.log('[index] data: ', data)
    return <div>error</div>
  }

  const {username, role} = data.getUserInfo;

  return (
    <ul style={{display: 'flex', listStyleType: 'none'}}>
      {Object.entries(links(username))
        .filter(([key]) => key !== 'upload' || RolesEnum[role] >= RolesEnum['CONTRIBUTOR'] )
        .map(([key, {to, text}]) => (
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

const TopNav = () => {

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
        <HeaderLinks />
      </HeaderItems>
    </HeaderNav>
  )
}
export default TopNav;