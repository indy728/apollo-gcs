const dotenv = require('dotenv');
dotenv.config();
const {ApolloServer, gql} = require('apollo-server-express');
const {existsSync, mkdirSync} = require('fs');
const path = require('path');
const express = require('express');
const {typeDefs, resolvers} = require('./schema');

existsSync(path.join(__dirname, "img")) || mkdirSync(path.join(__dirname, "images"));

const server = new ApolloServer({typeDefs, resolvers});
const app = express();

app.use('/img', express.static(path.join(__dirname, 'img')));
server.applyMiddleware({app});

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});