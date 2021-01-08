const {gql} = require('apollo-server-express');
const {createWriteStream, readdirSync, unlinkSync} = require('fs');
const mm = require('music-metadata');
const {Storage} = require('@google-cloud/storage');

const path = require('path');

const gcsClient = new Storage({
  keyFile: path.join(__dirname, '..', 'key.json'),
  // Below is questionably needed
  // projectId: 'music-bucket-test',
})

// let files = [];
// const files = 
// console.log(files)
const musicBucket = gcsClient.bucket('music-storage-test')


const typeDefs = gql`
 type Query {
   files: [String]
 }

  type MetaData {
    format: String,
    title: String,
    duration: Int,
    artist: String,
    artists: [String],
    key: String,
    bpm: String,
    # save album art for another time
    # involves converting hex octets to img
    # picture: []
  }

 type Mutation {
   uploadFile(file: Upload!): String,
   deleteFile(file: String!): Boolean
 }
`

const resolvers = {
  Query: {
    // could do await new Promise with readdir (async)
    files: () => readdirSync(path.join(__dirname, 'img'))
  },
  Mutation: {
    uploadFile: async(_, { file }) => {
      console.log('hello')
      const { createReadStream, filename } = await file;
      const metaData = {
        format: 'String',
        title: 'String',
        duration: -1,
        artist: 'String',
        artists: ['String'],
        key: 'String',
      }


      try {
        const metadata = await mm.parseStream(createReadStream());
        const {format: {
          container, duration
        }, common: {
          title, bpm, key, artist, artists 
        }} = metadata;
        
        const seconds = Math.trunc(duration)

        Object.assign(metaData, {
          format: container,
          title,
          duration: seconds,
          artist,
          artists,
          key,
          bpm,
        })
        console.log('[schema] metaData: ', metaData)
      } catch (error) {
        console.err(err.message);
      }


      // await new Promise(resolve => 
      //   createReadStream()
      //     .pipe(
      //       musicBucket.file(filename).createWriteStream({
      //         gzip: true
      //       })
      //     )
      //     .on('finish', resolve)  
      // )

      // await new Promise(resolve => 
      //   createReadStream()
      //     .pipe(createWriteStream(path.join(__dirname, 'img', filename)))
      //     .on('close', resolve)  
      // )

      // files.push(filename);

      return metaData;
    },
    deleteFile: (_, {file}) => {
      console.log(file)
      const url = path.join(__dirname, 'img', file)
      console.log('[schema] url: ', url)
      unlinkSync(url)
      return true
    }
  }

}

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
