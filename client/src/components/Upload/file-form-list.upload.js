import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import {FILES_QUERY, UNSTAGE_TRACKS, TRACK_UPLOAD} from '../apollo'
import styled from 'styled-components';
import {UploadForm} from './components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const FileUploadContainer = styled.main`
  background-color: teal;
  width: auto;
  margin: 32px auto;

  @media (min-width: 600px) {
    width: 600px;
  }
`

const FileUploadPaper = styled(Paper)`
  && {
    background-color: #bbb;
    padding-bottom: 20px;
  }
`

const FileFormList = () => {
  const { data, loading, error } = useQuery(FILES_QUERY);
  const [unstageTracks] = useMutation(UNSTAGE_TRACKS, {
    refetchQueries: [{ query: FILES_QUERY}],
    // onCompleted: data => console.log('[Files] del_data: ', del_data)
  })

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error.message)
    return <div>error importing stagedTracks</div>
  }

  console.log('[Files] data: ', data)

  // const handleDelete = (file) => {
  //   console.log('[Files] file: ', file)
  //   if (file) {
  //     unstageTracks({variables: {files: [file]}})
  //   }
  // }

  return (
    // <FileUploadContainer className="file-upload-container">

    // </FileUploadContainer>
    <FileUploadContainer>
    <FileUploadPaper className={'file-upload-paper'}>
      <Typography component="h1" variant="h4" align="center">
        Songs Upload
      </Typography>
      {/* <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
          <StepLabel>{label}</StepLabel>
          </Step>
          ))}
        </Stepper> */}
      <>
           {data.stagedTracks && data.stagedTracks.map((metadata, i) => {
    
            return (
              <UploadForm metadata={metadata} key={metadata.filename + i} unstageTracks={unstageTracks} idx={i}/>
          )})}
        
      </>
    </FileUploadPaper>
    {/* <button onClick={() => trackUpload({variables: {entry: 'show me 69'}})}>FB TEST</button> */}
    {/* <Copyright /> */}
  </FileUploadContainer>
  );
};

export default FileFormList;
