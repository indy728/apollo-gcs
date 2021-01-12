const {gql} = require('apollo-server-express');
const {createWriteStream, readdirSync, unlinkSync} = require('fs');
const mm = require('music-metadata');
// const util = require('util')
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
   files: [MetaData]
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
    # save album art for another time
    # involves converting hex octets to tmp-music
    # picture: []
  }

 type Mutation {
   uploadToBucket(files: [Upload!]): Boolean,
   uploadToServer(files: [Upload!]): Boolean,
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
    }
  },
  Mutation: {
    uploadToServer: async(_, { files }) => {
      await Promise.all(files.map(async(file) => {
        const { createReadStream, filename } = await file;
        await new Promise(resolve => 
          createReadStream()
            .pipe(createWriteStream(path.join(__dirname, 'tmp-music', filename)))
            .on('close', resolve)  
        )
      }))

      return true
    },
    // figure out how to get an Upload type out of the file address
    // uploadToBucket: async(_, { files }) => {
    //   await Promise.all(files.map(async({createReadStream, filename}) => {
    //     await new Promise(resolve => 
    //       createReadStream()
    //         .pipe(
    //           musicBucket.file(filename).createWriteStream({
    //             gzip: true
    //           })
    //         )
    //         .on('finish', resolve)  
    //     )
    //   }))
    //   return true;
    // },
    deleteFile: (_, {file}) => {
      console.log(file)
      const url = path.join(__dirname, 'tmp-music', file)
      console.log('[schema] url: ', url)
      unlinkSync(url)
      return true
    }
  }
}
exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
