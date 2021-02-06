import React, {useState} from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import {SearchField, TrackList} from './components';

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

const TracksPageContainer = styled(Container)`
  && {
    background-color: ${({theme: {primary}}) => primary[0]}
  }
`

const SearchTracks = () => {
  const [query, setQuery] = useState('')
  const onChange = e => setQuery(e.target.value.toLowerCase());

  return (
    <TracksPageContainer>
      <SearchField onChange={onChange} />

      {searchLists.map((list) => (
        <TrackList query={query} list={list} />
      ))}
    </TracksPageContainer>
  )
}

export default SearchTracks;
