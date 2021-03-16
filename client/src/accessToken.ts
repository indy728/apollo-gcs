class AccessToken {
  _accessToken: string

  constructor() {
    this._accessToken = "";
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(token) {
    this._accessToken = token;
  }
}

const accessToken = new AccessToken();

export default accessToken;