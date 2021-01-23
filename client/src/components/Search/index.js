import React from 'react';
import SearchTracks from './components/Search'


const LookupTracks = () => {
  return (
    <>
      <main style={{margin: '2rem'}}>
        {/* Switch: search or browse */}
        {/* browsed selection */}
        <SearchTracks />
      </main>
      {/* @TODO: Checkout? */}
    </>
  )
}

export default LookupTracks;
