import apiTwitterAuth from "../../api/twittterAuth";

const state = {
  twitterUser: {},
  oAuthToken: null,
  oAuthTokenSecret: null,
  accessToken: null,
  accessTokenSecret: null
};

const mutations = {
  setTwitterUser(state, twitterUser) {
    state.twitterUser = twitterUser;
  },
  clearTwitterUser(state) {
    state.twitterUser = {};
  },
  setOAuthToken(state, oAuthToken) {
    state.oAuthToken = oAuthToken;
  },
  setOAuthTokenSecret(state, oAuthTokenSecret) {
    state.oAuthTokenSecret = oAuthTokenSecret;
  },
  clearOAuthTokens(state) {
    state.oAuthToken = null;
    state.oAuthTokenSecret = null;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setAccessTokenSecret(state, accessTokenSecret) {
    state.accessTokenSecret = accessTokenSecret;
  },
  clearAccessTokens(state) {
    state.accessToken = null;
    state.accessTokenSecret = null;
  }
};

const actions = {
  async fetchOAuthToken({ commit }) {
    const res = await apiTwitterAuth.getOAuthToken();
    commit("setOAuthToken", res.oauth_token);
    commit("setOAuthTokenSecret", res.oauth_token_secret);
  },
  async fetchAccessToken({ commit, state }, payload) {
    console.log(state);
    console.log(payload);
    const res = await apiTwitterAuth.getAccessToken(
      state.oAuthToken,
      state.oAuthTokenSecret,
      payload.oAuthVerifier
    );
    commit("clearOAuthTokens");
    commit("setAccessToken", res.access_token);
    commit("setAccessTokenSecret", res.access_token_secret);
  },
  async fetchTwitterUser({ commit }, payload) {
    const twitterUser = await apiTwitterAuth.getTwitterUser(
      payload.accessToken,
      payload.accessTokenSecret
    );
    commit("setTwitterUser", twitterUser);
  },
  async clearAuth({ commit }) {
    commit("clearAccessTokens");
    commit("clearOAuthTokens");
    commit("clearTwitterUser");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
