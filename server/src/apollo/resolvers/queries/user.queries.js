const {firestore_db} = require('../../firebase-config');
const {verify} = require('jsonwebtoken');

exports.getUserID = async (_, {}, {req, res}) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_SECRET);
    return payload.username
  } catch(err) {
    console.log(err);
    throw new Error("not authenticated");
  }
}

const firestoreGetUserRef = async ({username = ''}) => {
  const userRef = firestore_db.collection('users').doc(username);
  const doc = await userRef.get();
  
  if (!doc.exists) return null;
  return doc;
}

exports.getUserInfo = async (_, {}, {req, res}) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(' ')[1];
    const {username} = verify(token, process.env.JWT_SECRET);
    const userRef = await firestoreGetUserRef({username});

    if (!userRef) return null;
    const {role} = userRef.data()
    return {
      username,
      role
    }
  } catch(err) {
    console.log('[user.queries] err: ', err);
    return null
  }
}
