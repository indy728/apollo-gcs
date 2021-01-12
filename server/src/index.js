const dotenv = require('dotenv');
dotenv.config();
const {ApolloServer, gql} = require('apollo-server-express');
const {existsSync, mkdirSync} = require('fs');
const path = require('path');
const express = require('express');
const {typeDefs, resolvers} = require('./schema');

existsSync(path.join(__dirname, "tmp-music")) || mkdirSync(path.join(__dirname, "tmp-music"));

const server = new ApolloServer({typeDefs, resolvers});
const app = express();

app.use('/tmp-music', express.static(path.join(__dirname, 'tmp-music')));
server.applyMiddleware({app});

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});