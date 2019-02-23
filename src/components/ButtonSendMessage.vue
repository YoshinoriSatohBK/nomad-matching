<template lang="pug">
  ButtonBase(
    text="送信する"
    :componentStyle="componentStyle"
    :boxOuterStyle="boxOuterStyle"
    :boxInnerStyle="boxInnerStyle"
    :textStyle="textStyle"
    @click="click"
  )
    IconHeart(slot="icon")
</template>

<script>
import ButtonBase from "@/components/ButtonBase";
import IconHeart from "@/components/IconHeart";

export default {
  name: "ButtonMatchingLarge",
  components: {
    ButtonBase,
    IconHeart
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
        background: "#FF6666",
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
        left: "2px"
      }
    };
  }
};
</script>

<style scoped lang="stylus"></style>
