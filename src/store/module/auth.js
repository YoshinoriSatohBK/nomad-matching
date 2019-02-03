import AWS from "aws-sdk";
import awsExports from "../../aws-exports";
import apiTwitterAuth from "../../api/twittterAuth";

const state = {
  twitterUser: {},
  identityId: null,
  oAuthToken: null,
  oAuthTokenSecret: null
};

const mutations = {
  setTwitterUser(state, twitterUser) {
    state.twitterUser = twitterUser;
  },
  setIdentityId(state, identityId) {
    state.identityId = identityId;
  },
  setOAuthToken(state, oAuthToken) {
    state.oAuthToken = oAuthToken;
  },
  setOAuthTokenSecret(state, oAuthTokenSecret) {
    state.oAuthTokenSecret = oAuthTokenSecret;
  }
};

const actions = {
  async fetchTwitterOAuthToken({ commit }) {
    console.log(apiTwitterAuth);
    const res = await apiTwitterAuth.getOAuthToken();
    console.log(res);
    commit("setOAuthToken", res.oauth_token);
    commit("setOAuthTokenSecret", res.oauth_token_secret);
  },
  async fetchTwitterUser({ commit }, payload) {
    const twitterUser = await apiTwitterAuth.getTwitterUser(
      payload.accessToken,
      payload.accessTokenSecret
    );
    console.log(twitterUser);
    commit("setTwitterUser", twitterUser);
  },
  async fetchIdentityId({ commit }, payload) {
    const identity = await new AWS.CognitoIdentity()
      .getId({
        IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
        Logins: {
          "api.twitter.com": String(
            `${payload.accessToken};${payload.accessTokenSecret}`
          )
        }
      })
      .promise();
    console.log(identity.IdentityId);
    // console.log(AWS.config.credentials.identityId)
    commit("setIdentityId", identity.IdentityId);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
