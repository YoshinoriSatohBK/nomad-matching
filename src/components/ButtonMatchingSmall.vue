<template lang="pug">
  ButtonBase(
    text="お茶したい"
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
  name: "ButtonMatchingSmall",
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
        background: "#FF6666",
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
        left: "2px"
      }
    };
  }
};
</script>

<style scoped lang="stylus"></style>
