import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../util';
import { auth } from '../apollo/firebase-config';
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.REFRESH_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }

  return next();
};

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  // for testing
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.username}`;
  }

  // Original declaration:
  // async (_, {email, password}, {res}) => {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      // Firebase returns a user after supplying credentials
      const { user } = await auth().signInWithEmailAndPassword(email, password)

      if (!user) {
        throw new Error('unexpected login error')
      }

      sendRefreshToken(res, createRefreshToken({ username: user.displayName! }));

      return {
        accessToken: createAccessToken({ username: user.displayName! })
      }

    } catch ({ code, message }) {
      throw new Error(message)
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')

    return true
  }
}