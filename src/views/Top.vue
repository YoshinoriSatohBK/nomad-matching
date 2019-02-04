<template lang="pug">
  div
    div
      button(v-if="!authenticated" @click="signin()") Twitterで登録する
      button(v-else @click="signout()") signout
    div
      p 登録しているノマドワーカー
      div 検索条件
      ul
        li(v-for="user in userList")
          div {{ user }}

</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "top",
  components: {},
  computed: {
    authenticated: function() {
      return libAuth.authenticated();
    },
    userList: function() {
      return this.$store.state.users.publicList;
    }
  },
  async mounted() {
    await this.$store.dispatch("users/fetchUserList");
  },
  methods: {
    async signin() {
      await libAuth.authenticate();
    },
    async signout() {
      await libAuth.clearAuthentication();
    }
  }
};
</script>
