import {gql} from '@apollo/client';

export const UPLOAD_BUCKET = gql`
  mutation UploadToBucket($files: [Upload!]) {
    uploadToBucket(files: $files)
  }
`;

export const TRACK_UPLOAD = gql`
  mutation TrackUpload($entry: TrackInput) {
    trackUpload(entry: $entry)
  }
`;

export const STAGE_TRACKS = gql`
  mutation StageTracks($files: [Upload!]) {
    stageTracks(files: $files)
  }
`;

export const UNSTAGE_TRACKS = gql`
  mutation UnstageTracks($files: [String!]) {
    unstageTracks(files: $files)
  }
`;