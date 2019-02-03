<template lang="pug">
  div
    div waiting...

</template>

<script>
import auth from "../lib/auth";
import apiTwitterAuth from "../api/twittterAuth";

export default {
  name: "twitter-auth-callback",
  components: {},
  computed: {
    twitterUser: function() {
      return this.$store.state.auth.twitterUser;
    },
    userProfile: function() {
      return this.$store.state.auth.userProfile;
    },
    identityId: function() {
      return this.$store.state.auth.identityId;
    },
    oAuthToken: function() {
      return this.$route.query.oauth_token;
    },
    oAuthTokenSecret: function() {
      return this.$store.state.auth.oAuthTokenSecret;
    },
    oAuthVerifier: function() {
      return this.$route.query.oauth_verifier;
    }
  },
  async mounted() {
    const res = await apiTwitterAuth.getAccessToken(
      this.oAuthToken,
      this.oAuthTokenSecret,
      this.oAuthVerifier
    );
    const tokens = {
      accessToken: res.access_token,
      accessTokenSecret: res.access_token_secret
    };
    await auth.setCredentials(tokens.accessToken, tokens.accessTokenSecret);
    await this.$store.dispatch("auth/fetchTwitterUser", tokens);
    await this.$store.dispatch("auth/fetchIdentityId", tokens);
    await this.$store.dispatch("userProfile/fetchUserProfile");
    if (this.userProfile) {
      this.$router.push("/home");
    } else {
      this.$router.push("/user-profile");
    }
  }
};
</script>
