const {database, firestore_db} = require('../firebase-config')

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
    console.log('[index] err: ', err)
    return false
  }

  return true
}

exports.fsAdd = async (_, {entry}) => {
  const errors = []
  console.log('[index] entry: ', entry)
  try {
    const res = await firestore_db.collection('tracks').add(
      entry
    )

    // console.log('[index] res: ', res)
    // const pushSongToCategory = catPath => {
    //   database.ref(catPath).update({[id]: true});
    // }
    // const {artist, format, bpm, key} = entry;
    // const artists = artist.split(", ");
    
    // // @TODO: clean up paths. cannot include . # $ [ ]
    // for (let a in artists) {
    //   pushSongToCategory(`artist/${artists[a].replace('.', '&per;')}`)
    // }

    // // pushSongToCategory(`artist/${artist}`)
    // pushSongToCategory(`format/${format}`)
    // if (bpm.length){
    //   pushSongToCategory(`bpm/${bpm}`)
    // }
    // if (key.length){
    //   pushSongToCategory(`key/${key.replace('#', '&sharp;')}`)
    // }
  } catch(err) {
    errors.push(err)
    console.log('[index] err: ', err)
    return false
  }

  return true
}