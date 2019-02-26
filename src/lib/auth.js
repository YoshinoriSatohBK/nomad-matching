import AWS from "aws-sdk";
import awsExports from "../aws-exports";
import store from "../store";

const twitterState = store.state.twitter;

const setCredentials = async () => {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
    Logins: {
      "api.twitter.com": String(
        `${twitterState.accessToken};${twitterState.accessTokenSecret}`
      )
    }
  });
  await AWS.config.credentials.getPromise();
};

const authenticated = () => {
  return twitterState.accessToken && twitterState.accessTokenSecret;
};

const authenticate = async () => {
  if (authenticated()) {
    await setCredentials();
  } else {
    await store.dispatch("route/enableLoading");
    await store.dispatch("twitter/fetchOAuthToken");
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${
      twitterState.oAuthToken
    }`;
  }
};

const clearAuthentication = async () => {
  await store.dispatch("twitter/clearAuth");
};

const authenticateCallback = async oAuthVerifier => {
  await store.dispatch("twitter/fetchAccessToken", {
    oAuthVerifier: oAuthVerifier
  });
  await setCredentials();
  await store.dispatch("twitter/fetchTwitterUser", {
    accessToken: twitterState.access_token,
    accessTokenSecret: twitterState.access_token_secret
  });
};

export default {
  authenticated,
  authenticate,
  authenticateCallback,
  clearAuthentication
};
