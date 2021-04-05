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
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  me: User;
  getStagedTracks: Array<StagedTrack>;
  searchTracks: Array<Track>;
  downloadTrack: Scalars['Boolean'];
  hello2: Scalars['String'];
};


export type QuerySearchTracksArgs = {
  query: Scalars['String'];
  queryType: Scalars['String'];
};


export type QueryDownloadTrackArgs = {
  filename: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  uploads: Scalars['String'];
  downloads: Scalars['String'];
  role: Scalars['String'];
};

export type StagedTrack = {
  __typename?: 'StagedTrack';
  format: Scalars['String'];
  title: Scalars['String'];
  duration: Scalars['Int'];
  artist: Scalars['String'];
  key: Scalars['String'];
  genre: Scalars['String'];
  filename: Scalars['String'];
  bpm?: Maybe<Scalars['String']>;
};

export type Track = {
  __typename?: 'Track';
  id?: Maybe<Scalars['String']>;
  uploader?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  artists: Array<Scalars['String']>;
  duration: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  bpm?: Maybe<Scalars['String']>;
  genre: Array<Scalars['String']>;
  keywords: Array<Scalars['String']>;
  storageBucket?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: AuthResponse;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  deleteFiles: Scalars['Boolean'];
  stageTracks: Scalars['Boolean'];
  uploadTrack: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type MutationDeleteFilesArgs = {
  filenames: Array<Scalars['String']>;
};


export type MutationStageTracksArgs = {
  filenames: Array<Scalars['String']>;
};


export type MutationUploadTrackArgs = {
  entry: TrackInput;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
};

export type TrackInput = {
  uploader: Scalars['String'];
  _uploader: Scalars['String'];
  title: Scalars['String'];
  _title: Scalars['String'];
  artist: Scalars['String'];
  _artist: Scalars['String'];
  artists?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  key: Scalars['String'];
  keywords: Array<Scalars['String']>;
  bpm: Scalars['String'];
  genre: Scalars['String'];
  storageBucket: Scalars['String'];
  filename: Scalars['String'];
  _filename: Scalars['String'];
  format: Scalars['String'];
};

export type GetStagedTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStagedTracksQuery = (
  { __typename?: 'Query' }
  & { getStagedTracks: Array<(
    { __typename?: 'StagedTrack' }
    & Pick<StagedTrack, 'format' | 'title' | 'duration' | 'artist' | 'key' | 'genre' | 'filename' | 'bpm'>
  )> }
);

export type SearchTracksQueryVariables = Exact<{
  query: Scalars['String'];
  queryType: Scalars['String'];
}>;


export type SearchTracksQuery = (
  { __typename?: 'Query' }
  & { searchTracks: Array<(
    { __typename?: 'Track' }
    & Pick<Track, 'uploader' | 'title' | 'artist' | 'duration' | 'key' | 'bpm' | 'genre' | 'keywords' | 'filename' | 'format'>
  )> }
);

export type DownloadTracksQueryVariables = Exact<{
  filename: Scalars['String'];
}>;


export type DownloadTracksQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'downloadTrack'>
);

export type UploadTrackMutationVariables = Exact<{
  entry: TrackInput;
}>;


export type UploadTrackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadTrack'>
);

export type AuthUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'role'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & AuthUserFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export const AuthUserFragmentDoc = gql`
    fragment AuthUser on User {
  username
  role
}
    `;
export const GetStagedTracksDocument = gql`
    query GetStagedTracks {
  getStagedTracks {
    format
    title
    duration
    artist
    key
    genre
    filename
    bpm
  }
}
    `;

/**
 * __useGetStagedTracksQuery__
 *
 * To run a query within a React component, call `useGetStagedTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStagedTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStagedTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStagedTracksQuery(baseOptions?: Apollo.QueryHookOptions<GetStagedTracksQuery, GetStagedTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStagedTracksQuery, GetStagedTracksQueryVariables>(GetStagedTracksDocument, options);
      }
export function useGetStagedTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStagedTracksQuery, GetStagedTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStagedTracksQuery, GetStagedTracksQueryVariables>(GetStagedTracksDocument, options);
        }
export type GetStagedTracksQueryHookResult = ReturnType<typeof useGetStagedTracksQuery>;
export type GetStagedTracksLazyQueryHookResult = ReturnType<typeof useGetStagedTracksLazyQuery>;
export type GetStagedTracksQueryResult = Apollo.QueryResult<GetStagedTracksQuery, GetStagedTracksQueryVariables>;
export const SearchTracksDocument = gql`
    query SearchTracks($query: String!, $queryType: String!) {
  searchTracks(query: $query, queryType: $queryType) {
    uploader
    title
    artist
    duration
    key
    bpm
    genre
    keywords
    filename
    format
  }
}
    `;

/**
 * __useSearchTracksQuery__
 *
 * To run a query within a React component, call `useSearchTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTracksQuery({
 *   variables: {
 *      query: // value for 'query'
 *      queryType: // value for 'queryType'
 *   },
 * });
 */
export function useSearchTracksQuery(baseOptions: Apollo.QueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, options);
      }
export function useSearchTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, options);
        }
export type SearchTracksQueryHookResult = ReturnType<typeof useSearchTracksQuery>;
export type SearchTracksLazyQueryHookResult = ReturnType<typeof useSearchTracksLazyQuery>;
export type SearchTracksQueryResult = Apollo.QueryResult<SearchTracksQuery, SearchTracksQueryVariables>;
export const DownloadTracksDocument = gql`
    query DownloadTracks($filename: String!) {
  downloadTrack(filename: $filename)
}
    `;

/**
 * __useDownloadTracksQuery__
 *
 * To run a query within a React component, call `useDownloadTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useDownloadTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownloadTracksQuery({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useDownloadTracksQuery(baseOptions: Apollo.QueryHookOptions<DownloadTracksQuery, DownloadTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DownloadTracksQuery, DownloadTracksQueryVariables>(DownloadTracksDocument, options);
      }
export function useDownloadTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DownloadTracksQuery, DownloadTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DownloadTracksQuery, DownloadTracksQueryVariables>(DownloadTracksDocument, options);
        }
export type DownloadTracksQueryHookResult = ReturnType<typeof useDownloadTracksQuery>;
export type DownloadTracksLazyQueryHookResult = ReturnType<typeof useDownloadTracksLazyQuery>;
export type DownloadTracksQueryResult = Apollo.QueryResult<DownloadTracksQuery, DownloadTracksQueryVariables>;
export const UploadTrackDocument = gql`
    mutation UploadTrack($entry: TrackInput!) {
  uploadTrack(entry: $entry)
}
    `;
export type UploadTrackMutationFn = Apollo.MutationFunction<UploadTrackMutation, UploadTrackMutationVariables>;

/**
 * __useUploadTrackMutation__
 *
 * To run a mutation, you first call `useUploadTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadTrackMutation, { data, loading, error }] = useUploadTrackMutation({
 *   variables: {
 *      entry: // value for 'entry'
 *   },
 * });
 */
export function useUploadTrackMutation(baseOptions?: Apollo.MutationHookOptions<UploadTrackMutation, UploadTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadTrackMutation, UploadTrackMutationVariables>(UploadTrackDocument, options);
      }
export type UploadTrackMutationHookResult = ReturnType<typeof useUploadTrackMutation>;
export type UploadTrackMutationResult = Apollo.MutationResult<UploadTrackMutation>;
export type UploadTrackMutationOptions = Apollo.BaseMutationOptions<UploadTrackMutation, UploadTrackMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...AuthUser
  }
}
    ${AuthUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
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