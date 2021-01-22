const path = require('path');

// INITIALIZE FIREBASE
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
firebase.initializeApp(firebaseConfig);
exports.database = firebase.database();;

// INCLUDE SERVICE ACCOUNT CREDENTIALS, INITIALIZE CLOUD FIRESTORE
const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-music-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.firestore_db = admin.firestore();;

// INITIALIZE CLOUD STORAGE, CONNECT TO BUCKET
const {Storage} = require('@google-cloud/storage');
const bucketName = process.env.CLOUD_STORAGE_BUCKET_NAME
const gcsClient = new Storage({
  keyFile: path.join(__dirname, '..', 'gcs-music-bucket-key.json'),
  // Below is questionably needed
  // projectId: 'music-bucket-test',
})

exports.musicBucket = gcsClient.bucket(bucketName)