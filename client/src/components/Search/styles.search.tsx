import styled from 'styled-components';
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';

export const SearchMain = styled.main`
  margin: '2rem';
`;

// index.tsx
export const TracksPageContainer = styled(Container)``;

/* Track List with matui */

export const QuerySection = styled(Container)`
  && {
    padding: 40px 0;
    * {
      color: white;
    }

    /* &:first-of-type {
      border-top: 1px solid grey;
    } */
    &:not(:last-of-type) {
      border-bottom: 1px solid ${({theme: {primary}}) => primary[2]};
    }
  }
`

export const StyledTableRow = styled(TableRow)`
  background-color: ${({theme: {primary}}) => primary[1]};

  &:nth-of-type(odd) {
    background-color: ${({theme: {primary}}) => primary[2]};
  }

  :hover {
    background-color: ${({theme: {primary}}) => primary[3]};
  }
`

export const StyledTableCell = styled(TableCell)`
`

export const TracksTable = styled(Table)`
  && {
    background-color: ${({theme: {black}}) => black};
  
  & th, td {
    color: ${({theme: {text}}) => text.white};
    font-family: 'Barlow Condensed', sans-serif;
  }
  }
`

/* Search Field matui */


export const SearchBox = styled(Box)`
  padding: 60px 0;
`


export const SearchText = styled((props) => {
  return(
  <TextField classes={{root: 'root'}} {...props} />
  )}
)`
  &.root {
    padding: 1rem;
    background-color: ${({theme: {primary}}) => primary[2]};

    & input, svg {
      font-size: 2.4rem;
      color: white;
    }
  }
`;
