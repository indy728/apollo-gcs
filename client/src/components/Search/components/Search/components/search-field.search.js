import React from 'react';
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

const SearchBox = styled(Box)`
  padding: 60px 0;
`
const SearchText = styled(TextField)`
`;

const SearchField = ({onChange}) => {
  return (
    <SearchBox width={1} display="flex" justifyContent="center">
      <SearchText
        onChange={onChange}
        label="Search for Tracks"
        helperText="Artist, Title or Keywords"
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
