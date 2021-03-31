import {
  Resolver,
  Query,
  Mutation,
  Args,
  ArgsType,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../util';
import { auth, fbUpdateUserDisplayName, fsCreateUserDoc, fsDeleteUserDoc, fsGetUserRef } from '../apollo/firebase-config';
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
class AuthResponse {
  @Field()
  accessToken: string;
}

@ArgsType()
class AuthArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  username: string;
}

@Resolver()
export class UserResolver {
  // for testing
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.username}`;
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args() { email, password, username }: AuthArgs
  ): Promise<AuthResponse> {
    const userRef = await fsGetUserRef({ username });
    if (userRef) {
      throw new Error('That username is taken! Please choose a unique username.')
    }

    // Create the user in the database (easy to remove if there's a create-user fail);
    try {
      // Create user document in Cloud Firestore
      await fsCreateUserDoc({ username, email });
      // Create user with authentication management by firebase.
      await auth().createUserWithEmailAndPassword(email, password);
      // Update firebase user with a display name that to hold the username
      await fbUpdateUserDisplayName({ username });

      return {
        accessToken: createAccessToken({ username })
      }
    } catch (error) {
      // If this fails, delete the recently created user in firestore
      await fsDeleteUserDoc({ username });
      if (typeof error === 'string') {
        throw new Error(error);
      } else if (error.message) {
        throw new Error(error.message)
      }
      throw new Error('Unexpected user creation error')
    }
  }

  // Original declaration:
  // async (_, {email, password}, {res}) => {
  @Mutation(() => AuthResponse)
  async login(
    // @Arg('email') email: string,
    // @Arg('password') password: string,
    @Args() { email, password }: AuthArgs,
    @Ctx() { res }: MyContext
  ): Promise<AuthResponse> {
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