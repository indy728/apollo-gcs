const {auth, firestore_db} = require('../../firebase-config');
const {sign} = require('jsonwebtoken');

const setError = (code, message) => {
  return ({
    code,
    message
  })
}

const signNewJWT = ({username}) => {
  const accessToken = sign({username}, process.env.JWT_SECRET, {expiresIn: "15m"});
  return accessToken;
}

const getNewRefreshToken = ({username}) => {
  const accessToken = sign({username}, process.env.REFRESH_SECRET, {expiresIn: "7d"})
  return accessToken;
}

const firestoreGetUserRef = async({username = ''}) => {
  const userRef = await firestore_db.collection('users').doc(username);
  const {exists} = await userRef.get();
  
  if (!exists) return null;
  return userRef;
}

const fireStoreCreateUser = ({username = '', email = ''}) => {
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

  firestore_db.collection('users').doc(username).set(userObj)
}

const firebaseUpdateNewUserDetail = async({authenticatedUser}) => {
  const user = await auth().currentUser;
  
  if (user) {
    await user.updateProfile({
      displayName: authenticatedUser.username,
    }).then(x => console.log(x)).catch(({code, message}) => {
      authenticatedUser.error = setError(code, message)
    });
  } else {
    authenticatedUser.error = setError('auth/unexpected', 'user created with email but unable to update with username');
  }
}

exports.createUserWithEmailAndPassword = async (_, {email, password, username}, context) => {
  const authenticatedUser = {
    email,
    password,
    username,
  }

  const userRef = await firestoreGetUserRef({username});
  if (userRef) {
    authenticatedUser.error = setError('auth/username', 'That username is taken! Please choose a unique username.');
    return authenticatedUser;
  }

  // Create the user in the database (easy to remove if there's a create-user fail);
  try {
    await fireStoreCreateUser({username, email});

    // Create user with authentication management by firebase.
    // If this fails, delete the recently created user in firestore
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch({code, message}) {
      await firestore_db.collection('users').doc(username).delete();
      authenticatedUser.error = setError('email', message);
    }
  } catch (error) {
    authenticatedUser.error = setError('auth/unexpected', error);
  }
  await firebaseUpdateNewUserDetail({authenticatedUser});  

  return authenticatedUser;
  // .then((userCredential) => {
  //   // Signed in 
  //   var user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ..
  // });
}

exports.signInWithEmailAndPassword = async (_, {email, password, username}, {res}) => {
  const authenticatedUser = {}

  res.cookie('meatid', getNewRefreshToken({username}), {
    httpOnly: true,
    expires: 0,
  })

  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password)

    if (user) {
      authenticatedUser.username = user.displayName;
      authenticatedUser.email = user.email;
    } else {
      authenticatedUser.error = {
        code: 'auth/unexpected-login-error',
        message: 'An unexpected error occured on login'
      }
    }
  } catch({code, message}) {
    authenticatedUser.error = setError(code, message)
  }

  return authenticatedUser;
}

exports.signOut = async () => {
  try {
    await auth().signOut();

    return true
  } catch {
    return false
  }
}

