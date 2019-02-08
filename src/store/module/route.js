const excludeRoutes = ["twitter-auth-callback"];

const state = {
  showHeaderFooter: true
};

const mutations = {
  setShowHeaderFooter(state, showHeaderFooter) {
    state.showHeaderFooter = showHeaderFooter;
  }
};

const actions = {
  async setShowHeaderFooter({ commit }, payload) {
    commit("setShowHeaderFooter", !excludeRoutes.includes(payload.routeName));
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
