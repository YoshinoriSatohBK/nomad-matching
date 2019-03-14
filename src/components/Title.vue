<template lang="pug">
  div
    FullWidthImage(
      :imageSrc="require('@/assets/images/main_photo.jpg')",
      innerText="次は、2人でどこへ行こう"
    )
    div.text-title
      p ノマドワーカー専用のマッチングサイト
      p "nomad links"
</template>

<script>
import FullWidthImage from "@/components/FullWidthImage";

export default {
  name: "Title",
  components: {
    FullWidthImage
  }
};
</script>

<style scoped lang="stylus">
.text-title
  text-align center
  line-height 1.8rem
  font-size 14px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F
  p
    line-height 24px
</style>
