const dotenv = require('dotenv');
const http = require('http')
const fetch = require('node-fetch')
dotenv.config();
const {ApolloServer} = require('apollo-server-express');
const {existsSync, mkdirSync, createWriteStream} = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {verify} = require('jsonwebtoken');
const {resolvers} = require('./apollo/schema');
const {Query, Mutation, Track, User, Genre, Auth} = require('./apollo/typeDefs');
const {createAccessToken, createRefreshToken, sendRefreshToken} = require('./util');

existsSync(path.join(__dirname, "tmp-music")) || mkdirSync(path.join(__dirname, "tmp-music"));
existsSync(path.join(__dirname, "new-music")) || mkdirSync(path.join(__dirname, "new-music"));

const server = new ApolloServer({
  typeDefs: [Query, Mutation, Track, User, Genre, Auth],
  resolvers,
  context: ({req, res}) => ({req, res})
});
const app = express();

var whitelist = ['http://localhost:3000', 'http://localhost:4000'/** other domains if any */ ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json())
app.use(cookieParser());
// app.use('/tmp-music', express.static(path.join(__dirname, 'tmp-music')));
// app.use('/new-music', express.static(path.join(__dirname, 'new-music')));

// @TODO: app.post?
app.all('/download', function(req, res){
  const file = `${__dirname}/new-music/${req.body.filename}`;
  res.download(file); // Set disposition and send it.
});

app.post('/refresh_token', (req, res) => {
  const token = req.cookies.meatid
  if (!token) {
    return res.send({ ok: false, accessToken: '' })
  }
  
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_SECRET)    
  } catch(err) {
    console.error(err)
    return res.send({ ok: false, accessToken: '' })
  }

  // Payload is valid; can return access token
  const {username} = payload;
  // *Logic to make sure username exists in db*
  // if (![*username in db]) {
  //   return res.send({ ok: false, accessToken: '' })
  // }
  
  sendRefreshToken(res, createRefreshToken({username}));

  return res.send({ ok: true, accessToken: createAccessToken({username})});
})

server.applyMiddleware({app, cors: false});

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});