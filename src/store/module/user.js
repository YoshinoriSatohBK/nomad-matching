import { AWS } from "@aws-amplify/core";
import { API, graphqlOperation } from "aws-amplify";
import libUser from "../../lib/user";
import * as queries from "../../graphql/queries";
import * as gqlMutations from "../../graphql/mutations";

const LIMIT = 10;

const state = {
  authUserProfile: {},
  publicUserList: [],
  filter: {},
  sort: {},
  nextToken: 0,
  hasMoreUsers: true
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
  },
  setNextToken(state, nextToken) {
    state.nextToken = nextToken;
  },
  clearNextToken(state) {
    state.nextToken = 0;
  },
  setHasMoreUsers(state, hasMoreUsers) {
    state.hasMoreUsers = hasMoreUsers;
  }
};

function getSearchUserListParams(filter, sort, limit, nextToken) {
  let params = {
    limit: LIMIT,
    nextToken: nextToken
  };
  if (Object.keys(filter).length > 0) {
    params.filter = filter;
  }
  if (Object.keys(sort).length > 0) {
    params.sort = sort;
  }
  return params;
}

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
              wildcard: `*${payload.text}*`
            }
          },
          {
            skill: {
              wildcard: `*${payload.text}*`
            }
          },
          {
            location: {
              wildcard: `*${payload.text}*`
            }
          }
        ]
      };
    }
    commit("setFilter", filter);
    commit("clearNextToken");
    commit("setHasMoreUsers", true);
  },
  async clearFilter({ commit }) {
    commit("clearFilter");
  },
  async saveSort({ commit }, payload) {
    let sort = {};
    if (payload && payload.type === "recommended") {
      // sort = {
      //   field: "id",
      //   direction: "asc"
      // };
    }
    if (payload && payload.field) {
      sort = {
        field: payload.field,
        direction: payload.direction || "asc"
      };
    }
    commit("setSort", sort);
    commit("clearNextToken");
    commit("setHasMoreUsers", true);
  },
  async clearSort({ commit }) {
    commit("clearSort");
    commit("setHasMoreUsers", true);
  },
  async clearNextToken({ commit }) {
    commit("clearNextToken");
    commit("setHasMoreUsers", true);
  },
  async clearHasMoreUsers({ commit }) {
    commit("setHasMoreUsers", true);
  },
  async fetchPublicUserList({ commit, state }, payload) {
    const params = getSearchUserListParams(
      state.filter,
      state.sort,
      LIMIT,
      state.nextToken
    );
    const res = await API.graphql(
      graphqlOperation(queries.searchUserProfiles, params)
    );
    const fetchedUsersProfiles = res.data.searchUserProfiles;
    if (fetchedUsersProfiles.nextToken === null) {
      commit("setHasMoreUsers", false);
    }
    const publicUserList = await Promise.all(
      fetchedUsersProfiles.items.map(
        async user => await libUser.getDisplayUser(user)
      )
    );

    if (!payload) {
      commit("setPublicUserList", publicUserList);
    } else {
      if (payload.mode === "read-more") {
        commit(
          "setPublicUserList",
          state.publicUserList.concat(publicUserList)
        );
      } else {
        commit("setPublicUserList", publicUserList);
      }
    }
    commit("setNextToken", state.nextToken + fetchedUsersProfiles.items.length);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
