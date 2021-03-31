exports.isAuth = ({context}, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload;
    context.token = token
  } catch(err) {
    console.log(err);
  }

  return next();
}