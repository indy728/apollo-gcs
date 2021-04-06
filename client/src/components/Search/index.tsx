import React, {useState, ChangeEvent} from 'react';
import SearchField from './search-field.search';
import TrackList from './track-list.search';
import {TracksPageContainer} from './styles.search';

const searchLists = [
  {
    key: 'artists',
    text: 'Artists',
    queryType: '_artist'
  },
  {
    key: 'titles',
    text: 'Titles',
    queryType: '_title'
  },
  {
    key: 'keywords',
    text: 'Keyword Search',
    queryType: 'keywords'
  },
]

const SearchTracks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase());

  return (
    <TracksPageContainer>
      <SearchField onChange={onChange} />

      {searchLists.map((list) => (
        <TrackList key={list.key} query={searchTerm} list={list} />
      ))}
    </TracksPageContainer>
  )
}

export default SearchTracks;
