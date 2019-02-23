<template lang="pug">
  div.has-text-danger.error-message
    span {{ text }}
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    text: String
  }
};
</script>

<style scoped lang="stylus">
.error-message
  text-align left
  font-size 0.85rem
</style>
