const {gql} = require('apollo-server-express');
const {createWriteStream, existsSync, mkdirSync} = require('fs');
const path = require('path');

// const files = [];
const files = ['my-code-face.jpg'];

const typeDefs = gql`
 type Query {
   files: [String]
 }

 type Mutation {
   uploadFile(file: Upload!): Boolean
 }
`

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async(_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise(resolve => 
        createReadStream()
          .pipe(createWriteStream(path.join(__dirname, 'img', filename)))
          .on('close', resolve)  
      )

      files.push(filename);

      return true;
    }
  }

}

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
