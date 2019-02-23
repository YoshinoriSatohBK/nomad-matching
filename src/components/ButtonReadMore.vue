<template lang="pug">
  div.component(@click="click")
    div.box
      slot(
        name="icon"
      )
      div.text もっと見る
</template>

<script>
export default {
  name: "ButtonBase",
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../assets/styles/global.styl";

.component
  width 100%
  text-align center

.box
  display inline-block
  text-align center
  padding 0
  width: 150px
  height: 30px
  background white
  border-color #6C5A3F
  border-width 1px
  border-style solid
  border-radius 0

.text
  display inline-block
  position relative
  color #6C5A3F
  font-weight button-font-weight
  font-family font-family
  font-size 10px
</style>
