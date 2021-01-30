import React from 'react';
import styled from 'styled-components';
import {useMutation, useQuery} from '@apollo/client';
import {FILES_QUERY, STAGE_TRACKS, UNSTAGE_TRACKS} from '../apollo'
import FileFormList from './file-form-list.upload';
import FileSelector from './file-selector.upload';

const UploadPage = styled.main`
  width: auto;
  margin: 32px auto;
`

const Upload = () => {
  // Check to see if there are tracks staged for upload on Node server
  const queryResult = useQuery(FILES_QUERY);

  const [unstageTracks] = useMutation(UNSTAGE_TRACKS, {
    refetchQueries: [{ query: FILES_QUERY }],
  })
  const [stageTracks] = useMutation(STAGE_TRACKS, {
    refetchQueries: [{ query: FILES_QUERY}],
  })

  return (
    <UploadPage>
      <FileFormList queryResult={queryResult} unstageTracks={unstageTracks}/>
      <FileSelector queryResult={queryResult} stageTracks={stageTracks} />
    </UploadPage>
  )
}

export default Upload;