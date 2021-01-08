const {gql} = require('apollo-server-express');
const {createWriteStream, readdirSync, unlinkSync} = require('fs');
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

 type Mutation {
   uploadFile(file: Upload!): Boolean,
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
      const { createReadStream, filename } = await file;

      await new Promise(resolve => 
        createReadStream()
          .pipe(
            musicBucket.file(filename).createWriteStream({
              gzip: true
            })
          )
          .on('finish', resolve)  
      )

      // await new Promise(resolve => 
      //   createReadStream()
      //     .pipe(createWriteStream(path.join(__dirname, 'img', filename)))
      //     .on('close', resolve)  
      // )

      // files.push(filename);

      return true;
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
