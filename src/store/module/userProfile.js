import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

const state = {
  userProfile: {}
};

const mutations = {
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile;
  }
};

const actions = {
  async fetchUserProfile({ commit, rootState }) {
    const userProfile = await API.graphql(
      graphqlOperation(queries.getUserProfile, {
        id: rootState.auth.identityId
      })
    );
    console.log(userProfile);
    commit("setUserProfile", userProfile.data.getUserProfile);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
