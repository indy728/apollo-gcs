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
      signedUrl
      filename
    }
  }
`

export const DOWNLOAD_TRACKS = gql`
  query DownloadTracks($filename: String!){
    downloadTracks(filename: $filename)
  }
`