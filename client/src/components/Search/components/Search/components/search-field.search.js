import React from 'react';
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';

const SearchBox = styled(Box)`
  padding: 60px 0;
`

const SearchField = ({onChange}) => {
  return (
    <SearchBox width={1} display="flex" justifyContent="center">
      <TextField onChange={onChange} />
    </SearchBox>
  )
}

export default SearchField;
