import React from 'react';
import {useMutation} from '@apollo/client';
import {FILES_QUERY, UPLOAD_SERVER} from '../apollo'

const FileSelector = () => {
  const [uploadToServer] = useMutation(UPLOAD_SERVER, {
    refetchQueries: [{ query: FILES_QUERY}],
    onCompleted: () => console.log('Successfully uploaded to server')
  })

  const handleFileChange = e => {
    const selected = e.target.files;
    if (!selected.length) return 
    uploadToServer({variables: {files: selected}})
  }


  return (
    <div>
      <input type="file" accept=".mp3,.wav,.aif,.aiff" onChange={handleFileChange} multiple />
    </div>
    )
}

export default FileSelector;
