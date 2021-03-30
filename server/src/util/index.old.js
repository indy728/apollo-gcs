const {sign} = require('jsonwebtoken');

exports.createAccessToken = ({username}) => {
  const accessToken = sign({username}, process.env.JWT_SECRET, {expiresIn: "15m"});
  return accessToken;
}

exports.createRefreshToken = ({username}) => {
  const accessToken = sign({username}, process.env.REFRESH_SECRET, {expiresIn: "7d"})
  return accessToken;
}

exports.sendRefreshToken = (res, token) => {
  res.cookie('meatid', token, {
    httpOnly: true,
    path: '/refresh_token',
    expires: 0,
    sameSite: 'lax'
  })
}

// @TODO: invalidate old refresh tokens