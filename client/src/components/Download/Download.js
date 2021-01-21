import React, {useState} from 'react';
import {SongsList} from './components'

const Download = () => {
  const [query, setQuery] = useState('')
  const onChange = e => setQuery(e.target.value);
  return (
    <>
      <input onChange={onChange} />
      <SongsList query={query} queryType="_artist"/>
      <SongsList query={query} queryType="_title"/>
      <SongsList query={query} queryType="keywords"/>
    </>
  )
}

export default Download;
