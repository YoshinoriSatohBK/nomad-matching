import { API } from "aws-amplify";

const API_TWITTERAUTH = "api9ca178e8";

const getOAuthToken = async () => {
  return await API.post(API_TWITTERAUTH, "/twitter-auth/request-token", {});
};

const getAccessToken = async (oAuthToken, oAuthTokenSecret, oAuthVerifier) => {
  return await API.post(API_TWITTERAUTH, "/twitter-auth/access-token", {
    body: {
      oauth_token: oAuthToken,
      oauth_token_secret: oAuthTokenSecret,
      oauth_verifier: oAuthVerifier
    }
  });
};

const getTwitterUser = async (accessToken, accessTokenSecret) => {
  return await API.get(API_TWITTERAUTH, "/twitter-auth/get-user", {
    queryStringParameters: {
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret
    }
  });
};

export default {
  getOAuthToken,
  getAccessToken,
  getTwitterUser
};
