import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {FILES_QUERY, UPLOAD_FILE} from '../apollo'
import {UploadForm} from './components';

const Upload = () => {
  const [metaData, setMetaData] = useState(null)
  const [uploadFiles] = useMutation(UPLOAD_FILE, {
    refetchQueries: [{ query: FILES_QUERY}],
    onCompleted: ({uploadFile}) => setMetaData(uploadFile)
  })

  const handleFileChange = e => {
    const selected = e.target.files;
    console.log('[Upload] selected: ', selected)
    if (!selected.length) return 
    // console.log(selected[0])
    // console.log(typeof selected[0])
    uploadFiles({variables: {files: selected}})
  }


  return (
    <div>
      <input type="file" accept=".mp3,.wav,.aif,.aiff" onChange={handleFileChange} multiple />
      <div style={{width: '200px'}}>
        {metaData &&  metaData.map((song, idx) => <UploadForm metadata={song} key={idx} index={idx} />)}
      </div>
    </div>
    )
}

export default Upload;
