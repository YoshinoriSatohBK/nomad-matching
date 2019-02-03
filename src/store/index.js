import Vue from "vue";
import Vuex from "vuex";
import auth from "./module/auth";
import userProfile from "./module/userProfile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    userProfile
  }
});
