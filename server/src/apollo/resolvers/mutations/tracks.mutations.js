const { firestore_db, admin, musicBucket } = require("../../firebase-config");
const {createWriteStream} = require('fs');
const {deleteFiles} = require('../util/index');

const path = require('path')

exports.unstageTracks = deleteFiles;

// UPLOADS FILE OBJECTS TO SERVER FOR ANALYSIS
exports.stageTracks = async (_, { files }) => {
  await Promise.all(files.map(async(file) => {
    const { createReadStream, filename } = await file;
    await new Promise(resolve => 
      createReadStream()
        .pipe(createWriteStream(path.join(__dirname, '..', '..', '..', 'tmp-music', filename)))
        .on('close', resolve)  
    )
  }))

  return true
}

// UPLOAD TO STORAGE BUCKET AND RETURN LINKS
const uploadTrackToBucket = async (filename = '') => {
  if (!filename.length) return {
    err: ['No filename received for upload']
  }
  const pathToMusicFolder = path.join(__dirname, '..', '..', '..', 'tmp-music');
  const result = {
    errors: [],
  }

  try {
    const [file] = await musicBucket.upload(path.join(pathToMusicFolder, filename), {
      gzip: true,
    })

    if (!file.id) { throw new Error('Upload id not found') };
  } catch (err) {
    result.errors.push(err.message);
  }

  return result;
}

const toAlnumID = (str) => {
  const re = '/\s\w+/gi'
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
}

const fireStoreAddArtist = ({artist = '', id = ''}) => {
  const artistObj = {
    name: artist,
    tracks: [id],
    bio: {
      about: '',
      members: [],
      labels: [],
      picture: '',
    }
  }
  const _artist = toAlnumID(artist);
  console.log('[tracks.mutations] _artist: ', _artist)

  firestore_db.collection('artists').doc(_artist).set(artistObj)
}

const firestoreUpdateArtist = async({artist = '', id = ''}) => {
  const artistRef = await firestore_db.collection('artists').doc(artist);
  const {exists} = await artistRef.get();
  if (!exists) {
    fireStoreAddArtist({artist, id})
  } else {
    artistRef.update({
      tracks: admin.firestore.FieldValue.arrayUnion(id),
    })
  }
}

const firestoreUpdateUser = async({username = '', id = ''}) => {
  const userRef = await firestore_db.collection('users').doc(username)
  const {exists} = await userRef.get();
  if (!exists) {
    // fuck!
  } else {
    userRef.update({
      uploads: admin.firestore.FieldValue.arrayUnion(id),
    })
  }
}

const firestoreAddTrack = async(entry) => {
  const res = {
    errors: [],
    id: null
  }
  try {
    const {id} = await firestore_db.collection('tracks').add(
      entry
    )
    res.id = id;
    console.log('[tracks.mutations] id: ', id)

    const artists = entry.artist.split(', ');
    
    artists.forEach((artist) => {
      firestoreUpdateArtist({artist, id});
    });

    firestoreUpdateUser({username: entry.uploader, id});
    // @TODO: collection('genre').add(entry.genre if !genre in db)

  } catch(err) {
    res.errors.push(err.message);
  }

  return res
}

const checkBucketForFile = (filename) => {
  // @TODO: check for matching filename (ie return "filename already exists!") 
  return false;
}

// UPLOAD METADATA AND STORAGE LINK TO CLOUDE FIRESTORE
exports.trackUpload = async (_, {entry}) => {
  const fileExists = await checkBucketForFile(filename);
  const {errors} = await uploadTrackToBucket(entry.filename);
  if (errors.length) {
    return errors
  }
  const res = await firestoreAddTrack(entry);
  if (res.errors) {
    res.errors.forEach(error => errors.push(error));
  }

  if (!errors.length) {
    deleteFiles(null, {files: [entry.filename]})
  }
  return errors
}
