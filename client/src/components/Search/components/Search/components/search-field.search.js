import React from 'react';
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

const SearchBox = styled(Box)`
  padding: 60px 0;
`
const SearchText = styled((props) => {
  console.log('[search-field.search] props: ', props)
  return(
  <TextField classes={{root: 'root'}} {...props} />
  )}
)`
  &.root {
    padding: 1rem;
    background-color: ${({theme: {background}}) => background.dark2};

    & input, svg {
      font-size: 2.4rem;
      color: white;
    }
  }
`;

const SearchField = ({onChange}) => {
  return (
    <SearchBox width={1} display="flex" justifyContent="center">
      <SearchText
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </SearchBox>
  )
}

export default SearchField;
