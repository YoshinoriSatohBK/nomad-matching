import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import libUser from "../../lib/user";
import * as queries from "../../graphql/queries";
import * as gqlMutations from "../../graphql/mutations";

const state = {
  authUserProfile: {},
  publicUserList: []
};

const mutations = {
  setAuthUserProfile(state, authUserProfile) {
    state.authUserProfile = authUserProfile;
  },
  setPublicUserList(state, publicUserList) {
    state.publicUserList = publicUserList;
  }
};

const actions = {
  async fetchAuthUserProfile({ commit }) {
    const res = await API.graphql(
      graphqlOperation(queries.getUserProfile, {
        id: AWS.config.credentials.identityId
      })
    );
    commit("setAuthUserProfile", res.data.getUserProfile);
  },
  async saveAuthUserProfile({ commit, state }, payload) {
    const profile = Object.assign(
      {
        id: AWS.config.credentials.identityId
      },
      payload.profile
    );
    if (state.authUserProfile && state.authUserProfile.id) {
      const res = await API.graphql(
        graphqlOperation(gqlMutations.updateUserProfile, {
          input: profile
        })
      );
      commit("setAuthUserProfile", res.data.updateUserProfile);
    } else {
      const res = await API.graphql(
        graphqlOperation(gqlMutations.createUserProfile, {
          input: profile
        })
      );
      commit("setAuthUserProfile", res.data.createUserProfile);
    }
  },
  async fetchPublicUserList({ commit }, payload) {
    console.log(payload);
    const searchConditions = payload.searchConditions;
    const res = await API.graphql(
      graphqlOperation(queries.searchUserProfiles, {
        filter: {
          skill: searchConditions.text
        }
      })
    );
    const publicUserList = await Promise.all(
      res.data.searchUserProfiles.items.map(
        async user => await libUser.getDisplayUser(user)
      )
    );
    commit("setPublicUserList", publicUserList);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
