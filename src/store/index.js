import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import route from "./module/route";
import twitter from "./module/twitter";
import authUser from "./module/authUser";
import users from "./module/users";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    twitter,
    authUser,
    users,
    route
  }
});
