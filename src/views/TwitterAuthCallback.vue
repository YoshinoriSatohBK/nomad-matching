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
    }
  },
  async mounted() {
    await libAuth.authenticateCallback(this.oAuthVerifier);
    await this.$store.dispatch("userProfile/fetchUserProfile");
    if (this.userProfile) {
      this.$router.push("/top");
    } else {
      this.$router.push("/user-profile");
    }
  }
};
</script>
