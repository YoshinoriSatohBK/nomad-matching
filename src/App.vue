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

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    showHeaderFooter: function() {
      return this.$store.state.route.showHeaderFooter;
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
