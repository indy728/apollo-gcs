const path = require('path');

// INITIALIZE FIREBASE
import firebase from 'firebase';
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
export const database = firebase.database();
export const auth = firebase.auth;

// INCLUDE SERVICE ACCOUNT CREDENTIALS, INITIALIZE CLOUD FIRESTORE
export const admin = require('firebase-admin')
const serviceAccount = require('../../../firebase-music-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firestore_db = admin.firestore();

// INITIALIZE CLOUD STORAGE, CONNECT TO BUCKET
import { Storage } from '@google-cloud/storage';
const bucketName = process.env.CLOUD_STORAGE_BUCKET_NAME!
const gcsClient = new Storage({
  keyFile: path.join(__dirname, '..', 'gcs-music-bucket-key.json'),
  // Below is questionably needed
  // projectId: 'music-bucket-test',
})

export const musicBucket = gcsClient.bucket(bucketName)

interface UserAuth {
  username: string,
  email?: string,
}

export const fsGetUserRef = async ({ username }: UserAuth) => {
  const userRef = await firestore_db.collection('users').doc(username);
  const { exists } = await userRef.get();

  if (!exists) return null;
  return userRef;
}

export const fsCreateUserDoc = async ({ username, email }: UserAuth) => {
  const userObj = {
    username,
    email,
    role: 'VIEW_ONLY',
    name: '',
    tracks: [],
    bio: {
      about: '',
      picture: '',
    }
  }

  try {
    await firestore_db
      .collection('users')
      .doc(username)
      .set(userObj)
  } catch {
    throw new Error(`Failed to create user ${username} \
                      with email ${email} in database.`)
  }
}

// We've created a user with email and password, now we update that
// user in firebase with their username
export const fbUpdateUserDisplayName = async ({ username }: UserAuth) => {
  const user = auth().currentUser;

  if (!user) throw new Error("User created with email but unable to \
                              update with username")

  try {
    await user.updateProfile({ displayName: username })
  } catch ({ code, message }) {
    throw new Error(message)
  }
}

export const fsDeleteUserDoc = async ({ username }: UserAuth) => {
  await firestore_db
    .collection('users')
    .doc(username)
    .delete();
}