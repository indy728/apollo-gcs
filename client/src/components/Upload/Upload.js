import React from 'react';
import {useMutation} from '@apollo/client';
import {FILES_QUERY, UPLOAD_FILE} from '../apollo'

const Upload = () => {

  const [uploadFiles] = useMutation(UPLOAD_FILE, {
    refetchQueries: [{ query: FILES_QUERY}],
    onCompleted: data => console.log('[Upload] data: ', data)
  })

  const handleFileChange = e => {
    const selected = e.target.files;
    console.log('[Upload] selected: ', selected)
    if (!selected.length) return 
    console.log(selected[0])
    console.log(typeof selected[0])
    uploadFiles({variables: {file: selected[0]}})
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
    </div>
    )
}

export default Upload;
