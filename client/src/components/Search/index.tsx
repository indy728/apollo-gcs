import React from 'react';
import SearchTracks from './components/Search';
import {RouteComponentProps} from 'react-router-dom';


const LookupTracks: React.FC<RouteComponentProps> = () => {

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
