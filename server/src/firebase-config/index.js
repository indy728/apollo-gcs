const firebase = require('firebase');
var firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_CONFIG_APPID,
  measurementId: process.env.FIREBASE_CONFIG_MEASUREMENTID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
database.ref('test').once('value').then(s => console.log('[schema] s.val(): ', s.val()))
const path = require('path');

exports.database = database;