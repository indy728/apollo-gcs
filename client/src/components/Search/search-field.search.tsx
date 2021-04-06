
import React, {ChangeEvent} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import {SearchBox, SearchText} from './styles.search';

interface IProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: React.FC<IProps> = ({onChange}) => (
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

export default SearchField;
