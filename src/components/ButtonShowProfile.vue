<template lang="pug">
  ButtonBase(
    text="プロフィールを見る"
    :componentStyle="componentStyle"
    :boxOuterStyle="boxOuterStyle"
    :boxInnerStyle="boxInnerStyle"
    :textStyle="textStyle"
    @click="click"
  )
</template>

<script>
import ButtonBase from "@/components/ButtonBase";

export default {
  name: "ButtonShowProfile",
  components: {
    ButtonBase
  },
  methods: {
    click() {
      this.$emit("click");
    }
  },
  data() {
    return {
      componentStyle: {
        "line-height": "30px"
      },
      boxOuterStyle: {
        background: "#A68C67",
        width: "150px",
        height: "30px"
      },
      boxInnerStyle: {
        width: "146px",
        height: "26px",
        "margin-top": "2px"
      },
      textStyle: {
        "font-size": "10px",
        left: "0px"
      }
    };
  }
};
</script>

<style scoped lang="stylus">
.button-parent-sm
  line-height 30px
  text-align center

.profile-button-border
  display inline-block
  height 30px
  width 150px
  background #A68C67

.profile-button
  display inline-block
  text-align center
  margin-top 2px
  height 26px
  width 146px
  background #A68C67
  color white
  font-size 10px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  padding 0
  border-color white
  border-width 1px
  border-style solid

.profile-text
  display inline-block
  position relative
  top -3px
</style>
