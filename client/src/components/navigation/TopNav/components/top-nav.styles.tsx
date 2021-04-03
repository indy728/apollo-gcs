import styled from 'styled-components';

export const HeaderItemsContainer = styled.nav`
  height: 10rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  max-width: 1232px;
`;

export const HeaderItemsListContainer = styled.ul`
  display: flex;
  list-style-type: none;
`;

export const HeaderItem = styled.div`
  padding: 0 1rem;
  
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

export const HeaderNav = styled.header`
`;