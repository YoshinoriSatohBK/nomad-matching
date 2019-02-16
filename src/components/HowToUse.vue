<template lang="pug">
  div.section.how-to-use
    SectionTitle(text="使い方")
    carousel(
      :perPage="perPage"
      paginationColor="#FFFFFF"
      paginationActiveColor="#FF6666"
      :paginationSize="paginationSize"
    )
      slide(v-for="step in steps")
        img(:src="step.headImageSrc").step-image
        div.step-text {{ step.headText }}
        img(:src="step.bodyImageSrc" :width="step.width" :style="{left: step.left}").step-body-image
</template>

<script>
import SectionTitle from "@/components/SectionTitle";

export default {
  name: "HowToUse",
  components: {
    SectionTitle
  },
  data() {
    return {
      perPage: 1,
      paginationSize: 16,
      steps: [
        {
          headImageSrc: require("@/assets/images/step1.png"),
          headText: "気になるノマドを探す",
          bodyImageSrc: require("@/assets/images/step1_pic.png"),
          width: "265px",
          left: "0px"
        },
        {
          headImageSrc: require("@/assets/images/step2.png"),
          headText: "まずはお茶に誘ってみる",
          bodyImageSrc: require("@/assets/images/step2_pic.png"),
          width: "265px",
          left: "0px"
        },
        {
          headImageSrc: require("@/assets/images/step3.png"),
          headText: "相手にメールが届きます。",
          bodyImageSrc: require("@/assets/images/step3_pic.png"),
          width: "265px",
          left: "0px"
        }
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.how-to-use
  text-align center
  background #F5F5F5
  margin 20px 0
  padding 30px !important
  border-top solid 2px #6C5A3F
  border-bottom solid 2px #6C5A3F

.step-image
  width 70px
  height 40px
  position relative
  left -6px

.step-body-image
  position relative

.step-text
  font-size 14px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F
  margin-bottom 8px
</style>
