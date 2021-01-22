const {database, firestore_db, musicBucket} = require('../firebase-config')
const {createWriteStream, unlinkSync} = require('fs');
const path = require('path')
const bucketName = process.env.CLOUD_STORAGE_BUCKET_NAME;

// UPLOAD TO STORAGE BUCKET AND RETURN LINKS
const uploadToBucket = async ({filename = ''}) => {
  if (!filename.length) return {
    err: ['No filename received for upload']
  }
  const pathToMusicFolder = path.join(__dirname, '..', 'tmp-music');
  const result = {
    errors: [],
  }

  try {
    const [file] = await musicBucket.upload(path.join(pathToMusicFolder, filename), {
      gzip: true,
    })

    if (!file.id) { throw new Error('Upload id not found') };
    const directUrl = `https://storage.cloud.google.com/${bucketName}/${file.id}`
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    });

    Object.assign(result, {
      directUrl,
      signedUrl
    })
  } catch (err) {
    result.errors.push(err.message);
  }

  return result;
}

// UPLOAD METADATA AND STORAGE LINK TO CLOUDE FIRESTORE
exports.fsAdd = async (_, {entry}) => {
  // @TODO: check for matching filename (ie return "filename already exists!") 

  const {errors, directUrl, signedUrl} = await uploadToBucket({filename: entry.filename})

  if (errors.length) {
    return errors
  }
  
  Object.assign(entry, {directUrl, signedUrl});
  
  try {
    const res = await firestore_db.collection('tracks').add(
      entry
    )

    // @TODO: collection('artists').add(entry.artist if !artist in db)
    // @TODO: collection('genre').add(entry.genre if !genre in db)

  } catch(err) {
    errors.push(err)
  }

  return errors
}

// UPLOADS FILE OBJECTS TO SERVER FOR ANALYSIS
exports.uploadToServer = async (_, { files }) => {
  await Promise.all(files.map(async(file) => {
    const { createReadStream, filename } = await file;
    await new Promise(resolve => 
      createReadStream()
        .pipe(createWriteStream(path.join(__dirname, '..', 'tmp-music', filename)))
        .on('close', resolve)  
    )
  }))

  return true
}

// REMOVES FILE OBJECTS FROM server
exports.deleteFile = (_, {file}) => {
  const url = path.join(__dirname, '..', 'tmp-music', file)
  unlinkSync(url)
  return true
}

/****************DEPRECATED********************/

// DEPRECATED: not currently using Firebase
exports.fbWrite = async (_, {entry}) => {
  const errors = []
  
  try {
    const {key: id} = await database.ref(`songs`).push(
      entry
    )
    const pushSongToCategory = catPath => {
      database.ref(catPath).update({[id]: true});
    }
    const {artist, format, bpm, key} = entry;
    const artists = artist.split(", ");
    
    // @TODO: clean up paths. cannot include . # $ [ ]
    for (let a in artists) {
      pushSongToCategory(`artist/${artists[a].replace('.', '&per;')}`)
    }

    // pushSongToCategory(`artist/${artist}`)
    pushSongToCategory(`format/${format}`)
    if (bpm.length){
      pushSongToCategory(`bpm/${bpm}`)
    }
    if (key.length){
      pushSongToCategory(`key/${key.replace('#', '&sharp;')}`)
    }
  } catch(err) {
    errors.push(err)
    return false
  }

  return true
}