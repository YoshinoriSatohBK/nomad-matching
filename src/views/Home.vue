<template lang="pug">
  div
    button(@click="signin()") signin
    button(@click="signout()") signout

</template>

<script>
import auth from "../lib/auth";

export default {
  name: "home",
  components: {},
  computed: {
    oAuthToken: function() {
      return this.$store.state.auth.oAuthToken;
    },
    identityId: function() {
      return this.$store.state.auth.identityId;
    }
  },
  async mounted() {
    await auth.authenticated(
      "ap-northeast-1:4d5f6798-a9cf-4df8-9922-78766e1275ec"
    );
  },
  methods: {
    async signin() {
      await this.$store.dispatch("auth/fetchTwitterOAuthToken");
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${
        this.oAuthToken
      }`;
    },
    async signout() {}
  }
};
</script>
