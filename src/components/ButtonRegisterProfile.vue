<template lang="pug">
  ButtonBase(
    text="登録する"
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
  name: "ButtonRegisterProfile",
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
        "line-height": "53px"
      },
      boxOuterStyle: {
        background: "#A68C67",
        width: "234px",
        height: "53px"
      },
      boxInnerStyle: {
        width: "228px",
        height: "47px",
        "margin-top": "3px"
      },
      textStyle: {
        "font-size": "14px",
        left: "0px"
      }
    };
  }
};
</script>

<style scoped lang="stylus">
.button-parent
  width 100%
  height 53px
  line-height 53px
  margin 20px auto 0
  text-align center

.profile-button-border
  display inline-block
  height 53px
  width 234px
  background #A68C67

.profile-button
  display inline-block
  text-align center
  margin-top 3px
  height 47px
  width 228px
  background #A68C67
  color white
  font-size 14px
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
