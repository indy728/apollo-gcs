import React from "react";
import styled from 'styled-components';
import {UploadForm} from './components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`

const FileUploadPaper = styled(Paper)`
  && {
    background-color: #bbb;
    padding-bottom: 20px;
  }
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
          <Typography component="h1" variant="h4" align="center">
            Songs Upload
          </Typography>
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
