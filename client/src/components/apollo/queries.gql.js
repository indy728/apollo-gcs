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

export const SONGS_QUERY = gql`
  query SearchTracks($query: String!, $queryType: String!){
    searchTracks(query: $query, queryType: $queryType) {
      title
      artist
      bpm
      key
    }
  }
`