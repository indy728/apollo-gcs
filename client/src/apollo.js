import {ApolloClient, InMemoryCache} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { setContext } from '@apollo/client/link/context';
import { getAuth } from "my-util";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuth();
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include"
    }
  }
});

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin"
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
});