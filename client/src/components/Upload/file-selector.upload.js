import React from 'react';
import {useMutation} from '@apollo/client';
import {FILES_QUERY, STAGE_TRACKS} from '../apollo'

const FileSelector = () => {
  const [stageTracks] = useMutation(STAGE_TRACKS, {
    refetchQueries: [{ query: FILES_QUERY}],
    onCompleted: () => console.log('Successfully uploaded to server')
  })

  const handleFileChange = e => {
    const selected = e.target.files;
    if (!selected.length) return 
    stageTracks({variables: {files: selected}})
  }

  return (
    <div>
      <input type="file" accept=".mp3,.wav,.aif,.aiff" onChange={handleFileChange} multiple />
    </div>
  )
}

export default FileSelector;
