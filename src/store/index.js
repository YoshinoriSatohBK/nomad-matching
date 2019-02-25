import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import route from "./module/route";
import twitter from "./module/twitter";
import user from "./module/user";
import userOptions from "./module/userOptions";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    twitter,
    user,
    userOptions,
    route
  }
});
