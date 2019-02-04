import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as gqlMutations from "../../graphql/mutations";

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
    console.log(AWS.config.credentials.identityId);
    const userProfile = await API.graphql(
      graphqlOperation(queries.getUserProfile, {
        id: AWS.config.credentials.identityId
      })
    );
    console.log(userProfile);
    commit("setUserProfile", userProfile.data.getUserProfile);
  },
  async saveUserProfile({ commit, state }, payload) {
    const profile = Object.assign(
      {
        id: AWS.config.credentials.identityId
      },
      payload.profile
    );
    console.log(profile);
    if (state.userProfile && state.userProfile.id) {
      const res = await API.graphql(
        graphqlOperation(gqlMutations.updateUserProfile, {
          input: profile
        })
      );
      commit("setUserProfile", res.data.updateUserProfile);
    } else {
      const res = await API.graphql(
        graphqlOperation(gqlMutations.createUserProfile, {
          input: profile
        })
      );
      commit("setUserProfile", res.data.createUserProfile);
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
