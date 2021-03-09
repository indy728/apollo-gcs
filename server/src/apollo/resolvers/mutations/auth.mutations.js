const {auth} = require('../../firebase-config');

const setError = (code, message) => {
  return ({
    code,
    message
  })
}

exports.createUserWithEmailAndPassword = async (_, {email, password, username}) => {
  const authenticatedUser = {
    email,
    password,
    username,
  }

  try {
    await auth().createUserWithEmailAndPassword(email, password)
    const user = await auth().currentUser;

    if (user) {
      await user.updateProfile({
        displayName: username,
      }).catch(({code, message}) => {
        authenticatedUser.error = setError(code, message)
      });
    } else {
      authenticatedUser.error = setError('auth/no-current-user', 'user created with email but unable to update with username');
    }

  } catch({code, message}) {
    authenticatedUser.error = setError(code, message)
  }

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

exports.signInWithEmailAndPassword = async (_, {email, password, username}) => {
  const authenticatedUser = {}

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

