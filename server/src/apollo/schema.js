const {readdirSync} = require('fs');
// const {firestoreTrackUpload, uploadToServer, deleteFile} = require('./resolvers/mutations')
const {trackMutations, authMutations} = require('./resolvers/mutations')
const { trackQueries, authQueries } = require('./resolvers/queries');

const {
  stagedTracks, searchTracks, getAllGenres, retrieveTrackFromStorage
} = trackQueries

const {
  checkAuth,
} = authQueries

const {
  stageTracks, trackUpload, unstageTracks 
} = trackMutations

const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = authMutations;

const resolvers = {
  Query: {
    checkAuth,
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
    signInWithEmailAndPassword,
  }
}

exports.resolvers = resolvers;
