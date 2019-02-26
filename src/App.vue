<template lang="pug">
  div
    b-loading(
      :active.sync="loading"
    )
    Header(v-if="showHeaderFooter")
    router-view
    Footer(v-if="showHeaderFooter")
</template>

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
    },
    loading: function() {
      return this.$store.state.route.loading;
    }
  },
  head: {
    title: {
      inner: "Nomad Links"
    },
    link: [
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      }
    ]
  }
};
</script>
