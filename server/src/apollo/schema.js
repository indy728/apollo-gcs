const {readdirSync} = require('fs');
const mm = require('music-metadata');
// const {firestoreTrackUpload, uploadToServer, deleteFile} = require('./resolvers/mutations')
const {stageTracks, trackUpload, unstageTracks} = require('./resolvers/mutations')
const {firestore_db, musicBucket} = require('./firebase-config')
const path = require('path');

const resolvers = {
  Query: {
    // could do await new Promise with readdir (async)
    stagedTracks: async () => {
      const files = readdirSync(path.join(__dirname, '..', 'tmp-music'))

      const mds = await Promise.all(files.map(async(file) => {
        const metaData = {
          format: '',
          title: '',
          duration: -1,
          artist: '',
          key: '',
          genre: '',
          filename: file
        }

        try {
          const metadata = await mm.parseFile(path.join(__dirname, '..','tmp-music', file));
          // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
          // const metadata = await mm.parseStream(createReadStream());
          const {format: {
            container, duration
          }, common: {
            title, bpm, key, artist, genre
          }} = metadata;

          Object.assign(metaData, {
            format: container,
            title: title || '',
            duration: duration && Math.trunc(duration) || 0,
            artist: artist || '',
            key: key || '',
            bpm: bpm || '',
            genre: genre || [],
          })
  
          return metaData
        } catch (error) {
          console.err(err.message);
        }
      }))

      return mds;
    },
    searchTracks: async (_, {query, queryType}) => {
      if (!query.length) return 
      let tracksRef
      if (queryType == 'keywords') {
        tracksRef = firestore_db.collection('tracks')
          .where(queryType, 'array-contains-any' , query.split(' '))
      } else {
        tracksRef = firestore_db.collection('tracks')
          .where(queryType, '>=' , query)
          .where(queryType, '<', query + '~');
      }
      const docs = await tracksRef.get()
      const tracks = [];
      docs.forEach(snapshot => {
        const data = snapshot.data()
        tracks.push(data)
      })
      return tracks
    },
    getAllGenres: async () => {
      const genresRef = firestore_db.collection('genres');

      /*
        **Reminder that docs is not an array. It is a class with a 'forEach' method.
        **You cannot use the map method on docs
      */
      const docs = await genresRef.get();
      const genres = [];
      docs.forEach((genre) => {
        const data = genre.data();
        genres.push(data);
      });
      return genres;
    },
    retrieveTrackFromStorage: async (_, {filename}) => {
      const destination = path.join(__dirname, '..', 'new-music', filename)
      const options = {
        destination,
      }

      try {
        await musicBucket.file(filename).download(options)
        return `Success`
      } catch(err) {
        return 'Fail'
      }
    }
  },
  Mutation: {
    stageTracks,
    trackUpload,
    unstageTracks,
  }
}

exports.resolvers = resolvers;
