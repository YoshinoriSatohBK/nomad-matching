<template lang="pug">
  div
    div
      router-link(to="/") Home
    router-view
</template>
<style lang="stylus"></style>

<script>
export default {
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
