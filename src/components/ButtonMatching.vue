<template lang="pug">
  div.button-parent-sm
    div.matching-button-border
      div(@click="matching()").matching-button
        div.matching-text お茶したい
</template>

<script>
export default {
  name: "ButtonMatching",
  props: {
    email: String
  },
  methods: {
    matching() {
      this.$emit("matching");
    }
  }
};
</script>

<style scoped lang="stylus">
.button-parent-sm
  line-height 30px
  text-align center

.matching-button-border
  display inline-block
  height 30px
  width 150px
  background #FF6666

.matching-button
  display inline-block
  text-align center
  margin-top 2px
  height 26px
  width 146px
  background #FF6666
  color white
  font-size 10px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  padding 0
  border-color white
  border-width 1px
  border-style solid

.matching-text
  display inline-block
  position relative
  top -3px
</style>
