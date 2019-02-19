import apiTwitterAuth from "../../api/twittterAuth";

const state = {
  user: {},
  oAuthToken: null,
  oAuthTokenSecret: null,
  accessToken: null,
  accessTokenSecret: null
};

const mutations = {
  setUser(state, user) {
    state.user = user;
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
    console.log(res);
    commit("setOAuthToken", res.oauth_token);
    commit("setOAuthTokenSecret", res.oauth_token_secret);
  },
  async fetchAccessToken({ commit, state }, payload) {
    const res = await apiTwitterAuth.getAccessToken(
      state.oAuthToken,
      state.oAuthTokenSecret,
      payload.oAuthVerifier
    );
    commit("clearOAuthTokens");
    commit("setAccessToken", res.access_token);
    commit("setAccessTokenSecret", res.access_token_secret);
  },
  async fetchTwitterUser({ commit, state }) {
    const user = await apiTwitterAuth.getTwitterUser(
      state.accessToken,
      state.accessTokenSecret
    );
    commit("setUser", user);
  },
  async clearAuth({ commit }) {
    commit("clearAccessTokens");
    commit("clearOAuthTokens");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
