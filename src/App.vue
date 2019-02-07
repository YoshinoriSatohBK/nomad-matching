<template lang="pug">
  div
    Header(v-if="showHeaderFooter")
    router-view
    Footer(v-if="showHeaderFooter")
</template>

<style lang="stylus"></style>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const excludeRoutes = ["twitter-auth-callback"];

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    showHeaderFooter: function() {
      return !excludeRoutes.includes(this.$router.history.current.name);
    }
  },
  head: {
    title: {
      inner: "Nomad Links"
    },
    link: [
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      }
    ]
  }
};
</script>
