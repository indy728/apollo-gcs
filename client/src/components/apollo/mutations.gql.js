import {gql} from '@apollo/client';

export const UPLOAD_BUCKET = gql`
  mutation UploadToBucket($files: [Upload!]) {
    uploadToBucket(files: $files)
  }
`;

export const FIREBASE_WRITE = gql`
  mutation FbWrite($entry: SongInput) {
    fbWrite(entry: $entry)
  }
`;

export const UPLOAD_SERVER = gql`
  mutation UploadToServer($files: [Upload!]) {
    uploadToServer(files: $files)
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($file: String!) {
    deleteFile(file: $file)
  }
`;