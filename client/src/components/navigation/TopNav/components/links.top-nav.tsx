import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { Typography, Spinner } from 'components/ui';
import {RolesEnum, GateWayStringsType} from 'global';
import {useMeQuery} from 'generated/graphql';
import {HeaderItemsListContainer, HeaderItem} from './top-nav.styles';

interface ILink {
  to: string
  text: string
  gateway?: GateWayStringsType
}

interface ILinks {
  [key: string]: ILink
}

const links: (user: string) => ILinks = (user) => ({
  'search': {
    to: '/search',
    text: 'Track Search'
  },
  'upload': {
    to: '/upload',
    text: 'Upload Tracks',
    gateway: 'CONTRIBUTOR'
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

const HeaderLinks: React.FC = () => {
  const history = useHistory();

  const {loading, data, error} = useMeQuery();
  const me = data?.me || null;
  
  if (loading) {
    return <Spinner />
  }

  // logout if error or no user in cache
  if (error || !me) {
    console.log('[client/src/components/navigation/TopNav/index.js] \
      error.message || "user not found, logging out": ',
      error?.message || "user not found, logging out");
    history.push('/logout');
    return (<div>error</div>)
  }

  const {username, role} = me;

  return (
    <HeaderItemsListContainer>
      {Object.entries(links(username))
        // ts thinks of RolesEnum as an array, can't access with string 
        // @ts-ignore
        .filter(([, {gateway}]) => !gateway || RolesEnum[role] >= RolesEnum[gateway] )
        .map(([key, {to, text}]) => (
        <li key={key}>
          <HeaderItem>
            <NavLink to={to} activeClassName="navlink-active">
              <Typography>
                {text}
              </Typography>
            </NavLink>
          </HeaderItem>
        </li>
      ))}
      {/* <li><div onClick={}</li> */}
    </HeaderItemsListContainer>
  )
}

export default HeaderLinks;
