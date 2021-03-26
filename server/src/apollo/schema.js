const {readdirSync} = require('fs');
// const {firestoreTrackUpload, uploadToServer, deleteFile} = require('./resolvers/mutations')
const {trackMutations, authMutations} = require('./resolvers/mutations')
const { trackQueries, authQueries, userQueries } = require('./resolvers/queries');

const {
  stagedTracks, searchTracks, getAllGenres, retrieveTrackFromStorage
} = trackQueries

const {
  checkAuth,
} = authQueries

const {
  getUserID,
  getUserInfo,
} = userQueries

const {
  stageTracks, trackUpload, unstageTracks 
} = trackMutations

const {
  createUserWithEmailAndPassword,
  createNewUser,
  login,
  logout,
} = authMutations;

const resolvers = {
  Query: {
    checkAuth,
    stagedTracks,
    searchTracks,
    getAllGenres,
    retrieveTrackFromStorage,
    getUserID,
    getUserInfo,
  },
  Mutation: {
    stageTracks,
    trackUpload,
    unstageTracks,
    createUserWithEmailAndPassword,
    createNewUser,
    login,
    logout,
  }
}

exports.resolvers = resolvers;
