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
      return this.$store.state.authUser.userProfile;
    }
  },
  async mounted() {
    await libAuth.authenticateCallback(this.oAuthVerifier);
    await this.$store.dispatch("authUser/fetchUserProfile");
    if (this.userProfile) {
      this.$router.push("/");
    } else {
      this.$router.push("/user-profile");
    }
  }
};
</script>
