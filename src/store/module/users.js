import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

const state = {
  publicList: []
};

const mutations = {
  setList(state, list) {
    state.publicList = list;
  }
};

const actions = {
  async fetchUserList({ commit }) {
    const res = await API.graphql(
      graphqlOperation(queries.searchUserProfiles, {})
    );
    console.log(res);
    commit("setList", res.data.searchUserProfiles.items);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
