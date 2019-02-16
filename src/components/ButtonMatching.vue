<template lang="pug">
  div.button-parent(
   :style="{ 'line-height': borderLineHeight }"
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
  name: "ButtonMatching",
  props: {
    size: {
      type: String,
      default: "medium"
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: "お茶したい"
    }
  },
  computed: {
    borderLineHeight: function() {
      return this.size === "large" ? "53px" : "30px";
    },
    borderWidth: function() {
      return this.size === "large" ? "234px" : "150px";
    },
    borderHeight: function() {
      return this.size === "large" ? "53px" : "30px";
    },
    buttonWidth: function() {
      return this.size === "large" ? "228px" : "146px";
    },
    buttonHeight: function() {
      return this.size === "large" ? "47px" : "26px";
    },
    fontSize: function() {
      return this.size === "large" ? "14px" : "10px";
    },
    iconSrc: function() {
      return require(`@/assets/images/${this.icon}.png`);
    },
    buttonMarginTop: function() {
      return this.size === "large" ? "3px" : "2px";
    }
  },
  methods: {
    matching() {
      this.$emit("matching");
    }
  }
};
</script>

<style scoped lang="stylus">
.button-parent
  width 100%
  text-align center

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
