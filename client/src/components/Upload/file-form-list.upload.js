import React from "react";
import styled from 'styled-components';
import {UploadForm} from './components';
import Typography from '@material-ui/core/Typography';

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background-color: ${({theme: {primary}}) => primary[0]};
  padding: 2rem 4rem;
`

const FileUploadPaper = styled.div`
  width: 100%;
`



const FileFormList = ({queryResult: { data, loading, error}, unstageTracks}) => {
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error.message)
    return <div>error importing stagedTracks</div>
  }

  return (
    // <FileUploadContainer className="file-upload-container">

    // </FileUploadContainer>
    <FileUploadContainer>
      {loading && <div>loading...</div>}
      {error && <div>error importing stagedTracks: {error.message}</div>}
      {data && data.stagedTracks.length ? (
        <FileUploadPaper className={'file-upload-paper'}>
          <>
              {data.stagedTracks && data.stagedTracks.map((metadata, i) => {
        
                return (
                  <UploadForm metadata={metadata} key={metadata.filename + i} unstageTracks={unstageTracks} idx={i}/>
              )})}
            
          </>
        </FileUploadPaper>
        ) : (
          <span>Choose tracks from your local drive to upload to <span className='brand-text'>meatport</span></span>
        )}
  </FileUploadContainer>
  );
};

export default FileFormList;
