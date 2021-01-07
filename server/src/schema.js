const {gql} = require('apollo-server-express');
const {createWriteStream, readdirSync, unlinkSync} = require('fs');
const { __Directive } = require('graphql');

const path = require('path');

// let files = [];
// const files = 
// console.log(files)

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
          .pipe(createWriteStream(path.join(__dirname, 'img', filename)))
          .on('close', resolve)  
      )

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
