const dotenv = require('dotenv');
const http = require('http')
const fetch = require('node-fetch')
dotenv.config();
const {ApolloServer} = require('apollo-server-express');
const {existsSync, mkdirSync, createWriteStream} = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const {typeDefs, resolvers} = require('./schema');

existsSync(path.join(__dirname, "tmp-music")) || mkdirSync(path.join(__dirname, "tmp-music"));
existsSync(path.join(__dirname, "new-music")) || mkdirSync(path.join(__dirname, "new-music"));

const server = new ApolloServer({typeDefs, resolvers});
const app = express();

app.use(cors())
app.use(express.json())
// app.use('/tmp-music', express.static(path.join(__dirname, 'tmp-music')));
// app.use('/new-music', express.static(path.join(__dirname, 'new-music')));

app.all('/download', function(req, res){
  const file = `${__dirname}/new-music/${req.body.filename}`;
  res.download(file); // Set disposition and send it.
});

// app.post('/download', (req, res) => {
//   res.header('Content-Type', 'application/json');
//   const {test, link, filename} = req.body;
//   console.log('[index] test: ', test)
//   res.send('hello')

//   const downloadFile = (async (url, path) => {
//     const res = await fetch(url);
//     const fileStream = createWriteStream(path);
//     await new Promise((resolve, reject) => {
//         res.body.pipe(fileStream);
//         res.body.on("error", reject);
//         fileStream.on("finish", resolve);
//       });
//   });

//   downloadFile(link, __dirname + '/' + filename)
  // const dl = createWriteStream(__dirname + '/test/dl.aiff');
  // dl.on('finish', () => console.log('[index] play song:'))
// })


server.applyMiddleware({app});

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});