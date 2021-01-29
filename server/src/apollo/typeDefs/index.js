const {gql} = require('apollo-server-express');

exports.Query = gql`
  type Query {
    _empty: String,
  }
`;

exports.Mutation = gql`
  type Mutation {
    _empty: String,
  }
`;

exports.Track = gql`
  type Track {
    id: String,
    uploader: String,
    title: String,
    artist: String,
    artists: [String],
    duration: Int,
    key: String,
    bpm: String,
    genre: String,
    keywords: [String],
    storageBucket: String,
    filename: String,
    format: String,
    # save album art for another time
    # involves converting hex octets to tmp-music
    # picture: []
  }

  input TrackInput {
    uploader: String,
    _uploader: String,
    title: String!,
    _title: String,
    artist: String,
    _artist: String,
    artists: [String],
    duration: Int,
    key: String,
    bpm: String,
    genre: String,
    keywords: [String],
    storageBucket: String,
    filename: String!,
    format: String,
    # save album art for another time
    # involves converting hex octets to tmp-music
    # picture: []
  }

  extend type Query {
    stagedTracks: [Track],
    searchTracks(query: String!, queryType: String!): [Track],
    retrieveTrackFromStorage(filename: String): String,
  }

  extend type Mutation {
    stageTracks(files: [Upload!]): Boolean,
    trackUpload(entry: TrackInput): [String],
    unstageTracks(files: [String!]): Boolean,
    # uploadToBucket(files: [String!]): Boolean,
  }
`;

exports.User = gql`
  type User {
    username: String!,
    uploads: [String],
    downloads: [String],
    roles: [String],
  }

  input UserInput {
    username: String!,
    _username: String,
    uploads: [String],
    downloads: [String],
    roles: [String],
  }

  extend type Mutation {
    updateUser(user: UserInput): User,
    addUser(user: UserInput): User,
  }
`;