import {gql} from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($file: String!) {
    deleteFile(file: $file)
  }
`;