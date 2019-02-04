<template lang="pug">
  div
    button(@click="signin()") signin
    button(@click="signout()") signout

</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "home",
  components: {},
  computed: {},
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
