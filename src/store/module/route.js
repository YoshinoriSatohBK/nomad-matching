const excludeRoutes = ["twitter-auth-callback"];

const state = {
  showHeaderFooter: true,
  showMenu: false,
  loading: false
};

const mutations = {
  setShowHeaderFooter(state, showHeaderFooter) {
    state.showHeaderFooter = showHeaderFooter;
  },
  setShowMenu(state, showMenu) {
    state.showMenu = showMenu;
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
};

const actions = {
  async setShowHeaderFooter({ commit }, payload) {
    commit("setShowHeaderFooter", !excludeRoutes.includes(payload.routeName));
  },
  async showMenu({ commit }) {
    commit("setShowMenu", true);
  },
  async hideMenu({ commit }) {
    commit("setShowMenu", false);
  },
  async enableLoading({ commit }) {
    commit("setLoading", true);
  },
  async disableLoading({ commit }) {
    commit("setLoading", false);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
