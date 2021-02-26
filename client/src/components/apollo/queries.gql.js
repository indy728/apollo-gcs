import { gql } from "@apollo/client";

export const FILES_QUERY = gql`
  {
    stagedTracks {
      format
      title
      duration
      artist
      key
      bpm
      filename
      genre
    }
  }
`;

export const TRACKS_QUERY = gql`
  query SearchTracks($query: String!, $queryType: String!){
    searchTracks(query: $query, queryType: $queryType) {
      title
      artist
      bpm
      key
      filename
    }
  }
`

export const GENRES_QUERY = gql`
  {
    getAllGenres {
      name
    }
  }
`

export const DOWNLOAD_TRACKS = gql`
  query DownloadTracks($filename: String!){
    retrieveTrackFromStorage(filename: $filename)
  }
`