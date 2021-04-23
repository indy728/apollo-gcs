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
// export const TracksPageContainer = styled.div`
//   padding: 0 2.4rem;

//   @media (min-width: 1280px) {
//     max-width: 1280px; 
//   }
// `;

/* Track List with matui */

export const QuerySection = styled.div`
  padding: 40px 0;
  
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({theme: {primary}}) => primary[2]};
  }
`

export const TracksTable = styled.table`
  display: relative;
  width: 100%;
  background-color: ${({theme: {black}}) => black};
  border-spacing: 0;
  cursor: default;
  
  thead, tbody {
    width: 100%;
  }
`

export const StyledTHead = styled.thead`
  tr th, tr td{
    padding: .6rem;
  }

  && tr {
    background-color: ${({theme: {primary}}) => primary[4]}
  }
`

export const StyledTBody = styled.tbody`
  tr {
    :hover {
      background-color: ${({theme: {primary}}) => primary[3]};
    }

    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const StyledTableRow = styled.tr`
  background-color: ${({theme: {primary}}) => primary[1]};
  th, td {
    padding: 1rem;
  }

  &:nth-of-type(odd) {
    background-color: ${({theme: {primary}}) => primary[2]};
  }
`

interface ITableCellProps {
  align?: 'left' | 'right' | 'center'
}

export const StyledTableCell = styled.td<ITableCellProps>`
  text-align: ${({align}) => align || 'left'};
`

export const StyledTableHead = styled.th<ITableCellProps>`
  text-align: ${({align}) => align || 'left'};
`;

export const DownloadButton = styled.div`
  padding: 0 1.2rem;
  transition: all .1s linear;

  :hover {
    transform: scale(1.25);
  }
`;


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
