<template lang="pug">
  div.component(
    :style="componentStyle"
  )
    div.box-outer(
      :style="boxOuterStyle"
    )
      div.box-inner(
        @click="click"
        :style="boxInnerStyle"
      )
        slot(
          name="icon"
        )
        div.text(
          :style="textStyle"
        ) {{ text }}
</template>

<script>
export default {
  name: "ButtonBase",
  props: {
    text: {
      type: String
    },
    componentStyle: {
      type: Object
    },
    boxOuterStyle: {
      type: Object
    },
    boxInnerStyle: {
      type: Object
    },
    textStyle: {
      type: Object
    }
  },
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

.box-outer
  display inline-block

.box-inner
  display inline-block
  text-align center
  padding 0
  border-color white
  border-width 1px
  border-style solid

.text
  display inline-block
  position relative
  top -6px
  color button-text-color
  font-weight button-font-weight
  font-family font-family
</style>
