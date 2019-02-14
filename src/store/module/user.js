import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import libUser from "../../lib/user";
import * as queries from "../../graphql/queries";
import * as gqlMutations from "../../graphql/mutations";

const state = {
  authUserProfile: {},
  publicUserList: [],
  filter: {},
  sort: {}
};

const mutations = {
  setAuthUserProfile(state, authUserProfile) {
    state.authUserProfile = authUserProfile;
  },
  setPublicUserList(state, publicUserList) {
    state.publicUserList = publicUserList;
  },
  setFilter(state, filter) {
    state.filter = filter;
  },
  clearFilter(state) {
    state.filter = {};
  },
  setSort(state, sort) {
    state.sort = sort;
  },
  clearSort(state) {
    state.sort = {};
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
  async saveFilter({ commit }, payload) {
    let filter = {};
    if (payload.text && payload.text !== "") {
      filter = {
        or: [
          {
            name: {
              match: payload.text
            }
          },
          {
            skill: {
              match: payload.text
            }
          },
          {
            location: {
              match: payload.text
            }
          }
        ]
      };
    }
    commit("setFilter", filter);
  },
  async clearFilter({ commit }) {
    commit("clearFilter");
  },
  async saveSort({ commit }, payload) {
    console.log(payload);
    let sort = {};
    if (payload && payload.type === "recommended") {
      console.log("recommended");
    }
    if (payload && payload.field) {
      sort = {
        field: payload.field,
        direction: payload.direction || "asc"
      };
    }
    console.log(sort);
    commit("setSort", sort);
  },
  async clearSort({ commit }) {
    commit("clearSort");
  },
  async fetchPublicUserList({ commit, state }) {
    let params = {};
    if (Object.keys(state.filter).length > 0) {
      params.filter = state.filter;
    }
    if (Object.keys(state.sort).length > 0) {
      params.sort = state.sort;
    }

    console.log(params);
    const res = await API.graphql(
      graphqlOperation(queries.searchUserProfiles, params)
    );
    console.log(res);
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
