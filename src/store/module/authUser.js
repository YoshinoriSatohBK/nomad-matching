import AWS from "aws-sdk";
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
  async fetchUserProfile({ commit }) {
    const userProfile = await API.graphql(
      graphqlOperation(queries.getUserProfile, {
        id: AWS.config.credentials.identityId
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
