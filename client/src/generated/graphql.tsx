import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  stagedTracks?: Maybe<Array<Maybe<Track>>>;
  searchTracks?: Maybe<Array<Maybe<Track>>>;
  retrieveTrackFromStorage?: Maybe<Scalars['String']>;
  getUserID?: Maybe<Scalars['String']>;
  getUserInfo?: Maybe<User>;
  getAllGenres?: Maybe<Array<Maybe<Genre>>>;
  checkAuth?: Maybe<Auth>;
};


export type QuerySearchTracksArgs = {
  query: Scalars['String'];
  queryType: Scalars['String'];
};


export type QueryRetrieveTrackFromStorageArgs = {
  filename?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  stageTracks?: Maybe<Scalars['Boolean']>;
  trackUpload?: Maybe<Array<Maybe<Scalars['String']>>>;
  unstageTracks?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
  addUser?: Maybe<User>;
  createUserWithEmailAndPassword?: Maybe<Auth>;
  signInWithEmailAndPassword?: Maybe<Auth>;
  createNewUser?: Maybe<Login>;
  login?: Maybe<Login>;
  logout?: Maybe<Scalars['Boolean']>;
};


export type MutationStageTracksArgs = {
  files?: Maybe<Array<Scalars['Upload']>>;
};


export type MutationTrackUploadArgs = {
  entry?: Maybe<TrackInput>;
};


export type MutationUnstageTracksArgs = {
  files?: Maybe<Array<Scalars['String']>>;
};


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>;
};


export type MutationAddUserArgs = {
  user?: Maybe<UserInput>;
};


export type MutationCreateUserWithEmailAndPasswordArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationSignInWithEmailAndPasswordArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationCreateNewUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Track = {
  __typename?: 'Track';
  id?: Maybe<Scalars['String']>;
  uploader?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Scalars['String']>>>;
  duration?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  bpm?: Maybe<Scalars['String']>;
  genre?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  storageBucket?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
};

export type TrackInput = {
  uploader?: Maybe<Scalars['String']>;
  _uploader?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  _title?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  _artist?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Scalars['String']>>>;
  duration?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  bpm?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  storageBucket?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  _filename: Scalars['String'];
  format?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  uploads?: Maybe<Array<Maybe<Scalars['String']>>>;
  downloads?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['String']>;
};

export type UserInput = {
  username: Scalars['String'];
  _username?: Maybe<Scalars['String']>;
  uploads?: Maybe<Array<Maybe<Scalars['String']>>>;
  downloads?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['String']>;
};

export type Genre = {
  __typename?: 'Genre';
  name?: Maybe<Scalars['String']>;
};

export type AuthError = {
  __typename?: 'AuthError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Auth = {
  __typename?: 'Auth';
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
};

export type Login = {
  __typename?: 'Login';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<AuthError>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateUserWithEmailAndPasswordMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}>;


export type CreateUserWithEmailAndPasswordMutation = (
  { __typename?: 'Mutation' }
  & { createUserWithEmailAndPassword?: Maybe<(
    { __typename?: 'Auth' }
    & Pick<Auth, 'email' | 'password' | 'username'>
    & { error?: Maybe<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'message'>
    )> }
  )> }
);

export type SignInWithEmailAndPasswordMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type SignInWithEmailAndPasswordMutation = (
  { __typename?: 'Mutation' }
  & { signInWithEmailAndPassword?: Maybe<(
    { __typename?: 'Auth' }
    & Pick<Auth, 'email' | 'username'>
    & { error?: Maybe<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'message'>
    )> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateNewUserMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}>;


export type CreateNewUserMutation = (
  { __typename?: 'Mutation' }
  & { createNewUser?: Maybe<(
    { __typename?: 'Login' }
    & Pick<Login, 'accessToken'>
    & { error?: Maybe<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'message'>
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Login' }
    & Pick<Login, 'accessToken'>
    & { error?: Maybe<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'message'>
    )> }
  )> }
);

export type CheckAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckAuthQuery = (
  { __typename?: 'Query' }
  & { checkAuth?: Maybe<(
    { __typename?: 'Auth' }
    & Pick<Auth, 'email' | 'username'>
    & { error?: Maybe<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'message'>
    )> }
  )> }
);

export type GetUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUserID'>
);

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = (
  { __typename?: 'Query' }
  & { getUserInfo?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'role'>
  )> }
);


export const CreateUserWithEmailAndPasswordDocument = gql`
    mutation CreateUserWithEmailAndPassword($email: String, $password: String, $username: String) {
  createUserWithEmailAndPassword(
    email: $email
    password: $password
    username: $username
  ) {
    email
    password
    username
    error {
      code
      message
    }
  }
}
    `;
export type CreateUserWithEmailAndPasswordMutationFn = Apollo.MutationFunction<CreateUserWithEmailAndPasswordMutation, CreateUserWithEmailAndPasswordMutationVariables>;

/**
 * __useCreateUserWithEmailAndPasswordMutation__
 *
 * To run a mutation, you first call `useCreateUserWithEmailAndPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserWithEmailAndPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserWithEmailAndPasswordMutation, { data, loading, error }] = useCreateUserWithEmailAndPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserWithEmailAndPasswordMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserWithEmailAndPasswordMutation, CreateUserWithEmailAndPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserWithEmailAndPasswordMutation, CreateUserWithEmailAndPasswordMutationVariables>(CreateUserWithEmailAndPasswordDocument, options);
      }
export type CreateUserWithEmailAndPasswordMutationHookResult = ReturnType<typeof useCreateUserWithEmailAndPasswordMutation>;
export type CreateUserWithEmailAndPasswordMutationResult = Apollo.MutationResult<CreateUserWithEmailAndPasswordMutation>;
export type CreateUserWithEmailAndPasswordMutationOptions = Apollo.BaseMutationOptions<CreateUserWithEmailAndPasswordMutation, CreateUserWithEmailAndPasswordMutationVariables>;
export const SignInWithEmailAndPasswordDocument = gql`
    mutation SignInWithEmailAndPassword($email: String, $password: String) {
  signInWithEmailAndPassword(email: $email, password: $password) {
    email
    username
    error {
      code
      message
    }
  }
}
    `;
export type SignInWithEmailAndPasswordMutationFn = Apollo.MutationFunction<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>;

/**
 * __useSignInWithEmailAndPasswordMutation__
 *
 * To run a mutation, you first call `useSignInWithEmailAndPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithEmailAndPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithEmailAndPasswordMutation, { data, loading, error }] = useSignInWithEmailAndPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInWithEmailAndPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>(SignInWithEmailAndPasswordDocument, options);
      }
export type SignInWithEmailAndPasswordMutationHookResult = ReturnType<typeof useSignInWithEmailAndPasswordMutation>;
export type SignInWithEmailAndPasswordMutationResult = Apollo.MutationResult<SignInWithEmailAndPasswordMutation>;
export type SignInWithEmailAndPasswordMutationOptions = Apollo.BaseMutationOptions<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($email: String, $password: String, $username: String) {
  createNewUser(email: $email, password: $password, username: $username) {
    accessToken
    error {
      code
      message
    }
  }
}
    `;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String, $password: String) {
  login(email: $email, password: $password) {
    accessToken
    error {
      code
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CheckAuthDocument = gql`
    query CheckAuth {
  checkAuth {
    email
    username
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useCheckAuthQuery__
 *
 * To run a query within a React component, call `useCheckAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckAuthQuery(baseOptions?: Apollo.QueryHookOptions<CheckAuthQuery, CheckAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAuthQuery, CheckAuthQueryVariables>(CheckAuthDocument, options);
      }
export function useCheckAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAuthQuery, CheckAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAuthQuery, CheckAuthQueryVariables>(CheckAuthDocument, options);
        }
export type CheckAuthQueryHookResult = ReturnType<typeof useCheckAuthQuery>;
export type CheckAuthLazyQueryHookResult = ReturnType<typeof useCheckAuthLazyQuery>;
export type CheckAuthQueryResult = Apollo.QueryResult<CheckAuthQuery, CheckAuthQueryVariables>;
export const GetUserIdDocument = gql`
    query GetUserID {
  getUserID
}
    `;

/**
 * __useGetUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
      }
export function useGetUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export type GetUserIdQueryHookResult = ReturnType<typeof useGetUserIdQuery>;
export type GetUserIdLazyQueryHookResult = ReturnType<typeof useGetUserIdLazyQuery>;
export type GetUserIdQueryResult = Apollo.QueryResult<GetUserIdQuery, GetUserIdQueryVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    username
    role
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;