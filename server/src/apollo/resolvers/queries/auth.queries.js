const {auth} = require('../../firebase-config');

exports.checkAuth = async () => {

  const authenticatedUser = {}

  const user = await auth().currentUser;
  if (!user) {
    authenticatedUser.error = {
      code: 'auth/no-user-logged-in',
      message: 'No current user'
    }
  } else {
    authenticatedUser.username = user.displayName;
    authenticatedUser.email = user.email;
  }

  return authenticatedUser;
}