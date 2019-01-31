<template lang="pug">
  div
    button(@click="signin()") signin
    button(@click="signout()") signout

</template>

<script>
import { API } from "aws-amplify";

export default {
  name: "home",
  components: {},
  methods: {
    async signin() {
      const res = await API.post(
        "api9ca178e8",
        "/twitter-auth/request-token",
        {}
      );
      localStorage.setItem("oauth_token", res.oauth_token);
      localStorage.setItem("oauth_token_secret", res.oauth_token_secret);
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${
        res.oauth_token
      }`;
    },
    async signout() {
      localStorage.removeItem("oauth_token");
      localStorage.removeItem("oauth_token_secret");
    }
  }
};
</script>
