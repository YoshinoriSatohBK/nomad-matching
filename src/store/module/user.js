import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as gqlMutations from "../../graphql/mutations";

const getIncomeRangeString = income => {
  if (income >= 0 && income < 400) {
    return "0〜400万";
  } else if (income >= 400 && income < 700) {
    return "400〜700万";
  } else if (income >= 700 && income < 1000) {
    return "700〜1000万";
  } else if (income >= 1000) {
    return "1000万以上";
  } else {
    return "未設定";
  }
};

const getNomadStatusString = nomadStatus => {
  if (nomadStatus === "nomad") {
    return "ノマド達成済み";
  } else {
    return "未設定";
  }
};

const getDisplayUser = user => {
  return {
    name: user.name,
    email: user.email,
    location: user.location,
    skill: user.skill,
    incomeRange: getIncomeRangeString(user.income),
    nomadStatus: getNomadStatusString(user.nomadStatus),
    imageUrl: user.imageUrl
  };
};

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
    commit("setAuthUserProfile", getDisplayUser(res.data.getUserProfile));
  },
  async saveAuthUserProfile({ commit, state }, payload) {
    const profile = Object.assign(
      {
        id: AWS.config.credentials.identityId
      },
      payload.profile
    );
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
  },
  async fetchPublicUserList({ commit }) {
    const res = await API.graphql(
      graphqlOperation(queries.searchUserProfiles, {})
    );
    const publicUserList = res.data.searchUserProfiles.items.map(user =>
      getDisplayUser(user)
    );
    // 複数ユーザ表示ダミー
    commit("setPublicUserList", [
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0],
      publicUserList[0]
    ]);
    // commit("setList", publicUserList);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
