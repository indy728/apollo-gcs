import {gql} from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation UploadFile($files: [Upload!]) {
    uploadFile(files: $files) {
      format
      title
      duration
      artist
      artists
      key
      bpm
      filename
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($file: String!) {
    deleteFile(file: $file)
  }
`;