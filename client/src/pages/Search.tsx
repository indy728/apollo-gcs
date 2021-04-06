import React from 'react';
import SearchTracks from 'components/Search';
import { SearchMain } from 'components/Search/styles.search';


const Search: React.FC = () => (
  <SearchMain>
    <SearchTracks />
  </SearchMain>
)

export default Search;
