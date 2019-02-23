<template lang="pug">
  ButtonBase(
    text="Twitterで登録する"
    :componentStyle="componentStyle"
    :boxOuterStyle="boxOuterStyle"
    :boxInnerStyle="boxInnerStyle"
    :textStyle="textStyle"
    @click="click"
  )
    IconTwitter(slot="icon")
</template>

<script>
import ButtonBase from "@/components/ButtonBase";
import IconTwitter from "@/components/IconTwitter";

export default {
  name: "ButtonRegisterTwitter",
  components: {
    ButtonBase,
    IconTwitter
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
        background: "#597E96",
        width: "234px",
        height: "53px"
      },
      boxInnerStyle: {
        width: "228px",
        height: "47px",
        "margin-top": "3px"
      },
      textStyle: {
        "font-size": "12px",
        left: "-5px"
      }
    };
  }
};
</script>

<style scoped lang="stylus"></style>
