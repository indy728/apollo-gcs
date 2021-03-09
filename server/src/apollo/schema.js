const {readdirSync} = require('fs');
// const {firestoreTrackUpload, uploadToServer, deleteFile} = require('./resolvers/mutations')
const {trackMutations, authMutations} = require('./resolvers/mutations')
const {stagedTracks, searchTracks, getAllGenres, retrieveTrackFromStorage} = require('./resolvers/queries');

const {
  stageTracks, trackUpload, unstageTracks 
} = trackMutations

const {
  createUserWithEmailAndPassword,
} = authMutations;

const resolvers = {
  Query: {
    // could do await new Promise with readdir (async)
    stagedTracks,
    searchTracks,
    getAllGenres,
    retrieveTrackFromStorage,
  },
  Mutation: {
    stageTracks,
    trackUpload,
    unstageTracks,
    createUserWithEmailAndPassword,
  }
}

exports.resolvers = resolvers;
