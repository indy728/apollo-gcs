const dotenv = require('dotenv');
const http = require('http')
const fetch = require('node-fetch')
dotenv.config();
const {ApolloServer} = require('apollo-server-express');
const {existsSync, mkdirSync, createWriteStream} = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const {resolvers} = require('./apollo/schema');
const {Query, Mutation, Track, User, Genre} = require('./apollo/typeDefs')

existsSync(path.join(__dirname, "tmp-music")) || mkdirSync(path.join(__dirname, "tmp-music"));
existsSync(path.join(__dirname, "new-music")) || mkdirSync(path.join(__dirname, "new-music"));

const server = new ApolloServer({typeDefs: [Query, Mutation, Track, User, Genre], resolvers});
const app = express();

app.use(cors())
app.use(express.json())
// app.use('/tmp-music', express.static(path.join(__dirname, 'tmp-music')));
// app.use('/new-music', express.static(path.join(__dirname, 'new-music')));

// @TODO: app.post?
app.all('/download', function(req, res){
  const file = `${__dirname}/new-music/${req.body.filename}`;
  res.download(file); // Set disposition and send it.
});

server.applyMiddleware({app});

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});