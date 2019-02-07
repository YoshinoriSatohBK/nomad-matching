<template lang="pug">
  div
    h2.section-title {{ this.text }}
    div.section-title-border

</template>

<script>
export default {
  name: "SectionTitle",
  props: {
    text: String
  }
};
</script>

<style scoped lang="stylus">
.section-title
  font-weight bold
  font-size 18px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F
  display inline-block

.section-title-border
  margin 7px auto 12px
  width 112px
  border-bottom solid 2px #6C5A3F
</style>
