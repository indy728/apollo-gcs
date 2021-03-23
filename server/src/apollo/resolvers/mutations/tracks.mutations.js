const { firestore_db, admin, musicBucket } = require("../../firebase-config");
const {createWriteStream, readdirSync} = require('fs');
const {deleteFiles} = require('../util/index');

const path = require('path')
const pathToMusicFolder = path.join(__dirname, '..', '..', '..', 'tmp-music');

exports.unstageTracks = (_, {files}) => {
  deleteFiles(files);
}

// UPLOADS FILE OBJECTS TO SERVER FOR ANALYSIS
exports.stageTracks = async (_, { files }) => {
  const len = readdirSync(pathToMusicFolder).length;
  files = files.slice(0, 10 - len);
  await Promise.all(files.map(async(file) => {
    const { createReadStream, filename } = await file;
    await new Promise(resolve => 
      createReadStream()
        .pipe(createWriteStream(path.join(pathToMusicFolder, filename)))
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

const fireStoreAddArtist = ({artist = '', _artist = '', id = ''}) => {
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

  firestore_db.collection('artists').doc(_artist).set(artistObj)
}

const firestoreUpdateArtist = async({artist = '', _artist = '', id = ''}) => {
  const artistRef = await firestore_db.collection('artists').doc(_artist);
  const {exists} = await artistRef.get();
  
  if (!exists) {
    fireStoreAddArtist({artist, _artist, id})
  } else {
    artistRef.update({
      tracks: admin.firestore.FieldValue.arrayUnion(id),
    })
  }
}

const fireStoreAddGenre = ({genre = '', _genre = '', id = ''}) => {
  const genreObj = {
    name: genre,
    tracks: [id],
  }

  firestore_db.collection('genres').doc(_genre).set(genreObj)
}

const firestoreUpdateGenre = async({genre = '', _genre = '', id = ''}) => {
  const genreRef = await firestore_db.collection('genres').doc(_genre);
  const {exists} = await genreRef.get();
  
  if (!exists) {
    fireStoreAddGenre({genre, _genre, id})
  } else {
    genreRef.update({
      tracks: admin.firestore.FieldValue.arrayUnion(id),
    })
  }
}

const fireStoreAddUser = ({username = '', id = ''}) => {
  const userObj = {
    username,
    name: '',
    tracks: [id],
    bio: {
      about: '',
      picture: '',
    }
  }

  firestore_db.collection('users').doc(username).set(userObj)
}

const firestoreUpdateUser = async({username = '', id = ''}) => {
  const userRef = await firestore_db.collection('users').doc(username)
  const {exists} = await userRef.get();
  if (!exists) {
    fireStoreAddUser({username, id})
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

    entry.artist.split(', ').forEach((artist) => {
      let _artist = toAlnumID(artist);

      firestoreUpdateArtist({artist, _artist, id});
    });
    firestoreUpdateGenre({genre: entry.genre, _genre: toAlnumID(entry.genre), id})
    firestoreUpdateUser({username: entry.uploader, id});
  } catch(err) {
    res.errors.push(err.message);
  }
  return res
}

const checkBucketForFile = (filename) => {
  // @TODO: check for matching filename (ie return "filename already exists!") 
  return false;
}

// UPLOAD METADATA AND STORAGE LINK TO CLOUD FIRESTORE
exports.trackUpload = async (_, {entry}) => {
  // @TODO: check for duplicates
  // const fileExists = await checkBucketForFile(entry.filename);

  // @TODO: upload to new music bucket
  const bres = await uploadTrackToBucket(entry._filename);
  const errors = [];
  console.log(bres)
  if (errors.length) {
    return errors
  }
  delete entry._filename
  const res = await firestoreAddTrack(entry);
  if (res.errors) {
    res.errors.forEach(error => errors.push(error));
  }

  // moved to front-end
  // if (!errors.length) {
  //   deleteFiles([entry._filename])
  // }
  return errors
}
