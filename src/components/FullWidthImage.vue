<template lang="pug">
  div.full-width-image
    div(v-if="this.innerText").full-width-image__text {{ this.innerText }}
    img(:src="this.imageSrc" width="100%")
</template>

<script>
export default {
  name: "FullWidthImage",
  props: {
    imageSrc: String,
    innerText: String
  }
};
</script>

<style scoped lang="stylus">
.full-width-image
  width: 100%
  &__text
    position absolute
    top 16%
    left 20px
    font-size 14px
    font-family Hiragino Kaku Gothic ProN
    font-weight bold
    color #6C5A3F
</style>
