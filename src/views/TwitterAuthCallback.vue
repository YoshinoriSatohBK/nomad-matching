<template lang="pug">
  div
    div waiting...

</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "twitter-auth-callback",
  components: {},
  computed: {
    oAuthVerifier: function() {
      return this.$route.query.oauth_verifier;
    },
    userProfile: function() {
      return this.$store.state.user.authUserProfile;
    }
  },
  async mounted() {
    await libAuth.authenticateCallback(this.oAuthVerifier);
    await this.$store.dispatch("user/fetchAuthUserProfile");
    if (this.userProfile) {
      this.$router.replace("/");
    } else {
      this.$router.push("/mypage");
    }
  }
};
</script>
