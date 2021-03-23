import {default as accessTokenReducer, setAccessToken} from './accessToken';

export const reducers = {
  accessToken: accessTokenReducer
}

export const actions = {
  setAccessToken
}