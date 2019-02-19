<template lang="pug">
  div.button-parent(
    :class="{ 'button-parent-sm': isSmall, 'button-parent-lg': isLarge }"
  )
  div.matching-button-border(
    :style="{ width: borderWidth, height: borderHeight }"
  )
    div(
    @click="matching()"
    :style="{ width: buttonWidth, height: buttonHeight, 'font-size': fontSize, 'margin-top': buttonMarginTop }"
    ).matching-button
      div.heart-icon(v-if="icon")
        img(:src="iconSrc")
      div.matching-text {{ text }}
</template>

<script>
export default {
  name: "Button",
  props: {
    size: {
      type: String
    },
    color: {
      type: String
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    isSmall: function() {
      return this.size === "small";
    },
    isLarge: function() {
      return this.size === "large";
    }
  }
};
</script>

<style scoped lang="stylus">
.button-parent
  width 100%
  text-align center

.button-parent-sm
  line-height 30px

.button-parent-lg
  line-height 53px

.matching-button-border
  display inline-block
  background #FF6666

.matching-button
  display inline-block
  text-align center
  margin-top 3px
  background #FF6666
  color white
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

.heart-icon
  display inline-block
  img
    position relative
    vertical-align middle
    width 50%
    height 50%
    top -5px
    left -10px
</style>
