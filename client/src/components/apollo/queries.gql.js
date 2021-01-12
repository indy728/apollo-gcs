import { gql } from "@apollo/client";

export const FILES_QUERY = gql`
  {
    files {
      format
      title
      duration
      artist
      key
      bpm
      filename
    }
  }
`;