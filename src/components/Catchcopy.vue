<template lang="pug">
  div.catchcopy
    div.mark-heart
      img(src="@/assets/images/mark_pc.png")
    SectionTitle(text="これからは、孤独じゃない")
    FullWidthImage(
      :imageSrc="require('@/assets/images/nomad_photo.jpg')"
    )
    p.copy-text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate. commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam vulputate.

</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import FullWidthImage from "@/components/FullWidthImage";

export default {
  name: "Catchcopy",
  components: {
    SectionTitle,
    FullWidthImage
  }
};
</script>

<style scoped lang="stylus">
.catchcopy
  text-align center

.mark-heart
  width 100%
  img
    display inline-block
    width 37.54px
    height 48.3px

.copy-text
  color #6C5A3F
  font-size 11px
  font-family Hiragino Kaku Gothic ProN
  line-height 1.2rem
  text-align left
  padding 8px 20px
  margin-bottom 50px
</style>
