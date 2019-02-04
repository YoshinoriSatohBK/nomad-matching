import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import twitter from "./module/twitter";
import userProfile from "./module/userProfile";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    twitter,
    userProfile
  }
});
