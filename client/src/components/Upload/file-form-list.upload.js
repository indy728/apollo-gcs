import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import {FILES_QUERY, DELETE_FILE, FIREBASE_WRITE} from '../apollo'
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
  const [deleteFiles] = useMutation(DELETE_FILE, {
    refetchQueries: [{ query: FILES_QUERY}],
    // onCompleted: data => console.log('[Files] del_data: ', del_data)
  })
  const [fbWrite] = useMutation(FIREBASE_WRITE, {
    onCompleted: () => console.log('Check the db')
  })

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error.message)
    return <div>error importing files</div>
  }

  console.log('[Files] data: ', data)

  // const handleDelete = (file) => {
  //   console.log('[Files] file: ', file)
  //   if (file) {
  //     deleteFiles({variables: {file}})
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
           {data.files && data.files.map((metadata, i) => {
    
            return (
              <UploadForm metadata={metadata} key={metadata.filename + i} idx={i}/>
          )})}
        
      </>
    </FileUploadPaper>
    <button onClick={() => fbWrite({variables: {entry: 'show me 69'}})}>FB TEST</button>
    {/* <Copyright /> */}
  </FileUploadContainer>
  );
};

export default FileFormList;
