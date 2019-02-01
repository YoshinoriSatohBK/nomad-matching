import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    twitterUser: {},
    identityId: null
  },
  mutations: {
    setTwitterUser(state, twitterUser) {
      state.twitterUser = twitterUser;
    },
    setIdentityId(state, identityId) {
      state.identityId = identityId;
    }
  },
  actions: {
    setTwitterUser({ commit }, twitterUser) {
      commit("setTwitterUser", twitterUser);
    },
    setIdentityId({ commit }, identityId) {
      commit("setIdentityId", identityId);
    }
  },
  getters: {
    getTwitterUser: state => state.twitterUser,
    getIdentityId: state => state.identityId
  }
});
