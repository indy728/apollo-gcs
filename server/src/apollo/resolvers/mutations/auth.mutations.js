const {auth, firestore_db} = require('../../firebase-config');
const {createAccessToken, createRefreshToken, sendRefreshToken} = require('../../../util');

const setError = (code, message) => {
  return ({
    code,
    message
  })
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

// We've created a user with email and password, now we update that
// user in firebase with their username
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

// We've created a user with email and password, now we update that
// user in firebase with their username
const updateUsername = async({username}) => {
  const user = await auth().currentUser;
  
  if (user) {
    await user.updateProfile({
      displayName: username,
    }).then()
      .catch(({code, message}) => {
      authenticatedUser.error = setError(code, message)
      throw new Error(message)
    });
  } else {
    throw new Error("user created with email but unable to update with username")
  }
}

exports.createNewUser = async (_, {email, password, username}, context) => {
  const userRef = await firestoreGetUserRef({username});
  if (userRef) {
    return {
      accessToken: createAccessToken(""),
      error: setError('auth/username', 'That username is taken! Please choose a unique username.')
    }
  }

  // Create the user in the database (easy to remove if there's a create-user fail);
  try {
    await fireStoreCreateUser({username, email});
    console.log('[auth.mutations] user created in Firestore')
    
    // Create user with authentication management by firebase.
    // If this fails, delete the recently created user in firestore
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('[auth.mutations] user created in Firebase')
    await updateUsername({username});
    console.log('[auth.mutations] username updated in Firebase')
    return {
      accessToken: createAccessToken({username})
    }
  } catch(error) {
    console.log('[auth.mutations] user creation error: ', error)
    await firestore_db.collection('users').doc(username).delete();
    return ({
      accessToken: "",
      error: setError(error.code || 'email', error.message || error)
    })
  }
}

exports.login = async (_, {email, password}, {res}) => {
  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password)

    if (user) {
      sendRefreshToken(res, createRefreshToken({username: user.displayName}));

      return {
        accessToken: createAccessToken({username: user.displayName})
      }
    } else {
      return {
        accessToken: "",
        error: setError(
          'auth/unexpected-login-error',
          'An unexpected error occured on login'
        )
      }
    }
  } catch({code, message}) {
    console.error('[auth.mutations] code, message: ', code, message)
    return {
      accessToken: "",
      error: setError(code, message)
    }
  }

}

exports.logout = async (_, {}, {res}) => {
  sendRefreshToken(res, '')
  console.log('[auth.mutations] hello: ')
  res.clearCookie('meatid')
  // res.send({ok: true, accessToken: ''})
  return true
}

