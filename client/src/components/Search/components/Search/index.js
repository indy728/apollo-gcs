import React, {useState} from 'react'
import Container from '@material-ui/core/Container';
import {SearchField, TrackList} from './components';

const searchLists = [
  {
    key: 'artists',
    text: 'Artists',
    queryType: '_artists'
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

const SearchTracks = () => {
  const [query, setQuery] = useState('')
  const onChange = e => setQuery(e.target.value);

  return (
    <Container>
      <SearchField onChange={onChange} />

      {searchLists.map((list) => (
        <TrackList query={query} list={list} />
      ))}
    </Container>
  )
}

export default SearchTracks;

//   <div key={key}>
      //     <div style={{height: '40px', backgroundColor: 'grey'}} />
      //     <div><span>{text}</span></div>
      //       <TrackList query={query} queryType={queryType} />
      //   </div>
      // ))}