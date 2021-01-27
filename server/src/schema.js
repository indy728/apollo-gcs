const {gql} = require('apollo-server-express');
const {readdirSync} = require('fs');
const mm = require('music-metadata');
const {fsAdd, uploadToServer, deleteFile} = require('./mutations')
const {firestore_db, musicBucket} = require('./firebase-config')
const path = require('path');

const typeDefs = gql`
  type Query {
    files: [MetaData],
    searchTracks(query: String!, queryType: String!): [MetaData],
    downloadTracks(filename: String): String,
  }

  type MetaData {
    format: String,
    title: String,
    filename: String,
    duration: Int,
    artist: String,
    artists: [String],
    key: String,
    bpm: String,
    id: String,
    directUrl: String,
    signedUrl: String,
    # save album art for another time
    # involves converting hex octets to tmp-music
    # picture: []
  }

  input SongInput {
    format: String,
    title: String!,
    _title: String,
    filename: String,
    duration: String,
    artist: String,
    _artist: String!,
    key: String,
    bpm: String,
    keywords: [String],
    # save album art for another time
    # involves converting hex octets to tmp-music
    # picture: []
  }

 type Mutation {
   uploadToBucket(files: [String!]): Boolean,
   uploadToServer(files: [Upload!]): Boolean,
   fsAdd(entry: SongInput): [String],
   deleteFile(file: String!): Boolean
 }
`

const resolvers = {
  Query: {
    // could do await new Promise with readdir (async)
    files: async () => {
      const files = readdirSync(path.join(__dirname, 'tmp-music'))

      const mds = await Promise.all(files.map(async(file) => {
        const metaData = {
          format: '',
          title: '',
          duration: -1,
          artist: '',
          key: '',
          filename: file
        }

        try {
          const metadata = await mm.parseFile(path.join(__dirname, 'tmp-music', file));
          // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
          // const metadata = await mm.parseStream(createReadStream());
          const {format: {
            container, duration
          }, common: {
            title, bpm, key, artist 
          }} = metadata;
          
          Object.assign(metaData, {
            format: container,
            title,
            duration: Math.trunc(duration),
            artist,
            key,
            bpm,
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

      // return await database.ref('songs').orderByValue('keywords').startAt('M').endAt('M'+'\uf8ff').once('value').then((snap) => {
      //   return Object.entries(snap.val())
      //     .map(([id, info]) => {
      //       return {...info, id}
      //     })
      // })
    },
    downloadTracks: async (_, {filename}) => {
      const destination = path.join(__dirname, 'new-music', )
      const options = {
        destination: __dirname + '/new-music/' + filename
      }
      const res = await musicBucket.file(filename).download(options)

      if (res) return 'Success'
      return 'Fail'
    }
  },
  Mutation: {
    fsAdd,
    uploadToServer,
    deleteFile,
  }
}
exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
