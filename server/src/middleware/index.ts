import { MiddlewareFn } from "type-graphql";
import { MyContext } from '../ContextType';
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    console.log('[index] token: ', token)
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.error('[index] err.message: ', err.message)
    console.log('[index] authorization: ', authorization)
    throw new Error("not authenticated");
  }

  return next();
};