<template lang="pug">
  div.button-parent
    div.search-button-border
      div(@click="scrollTo()").search-button
        div.button-text-wrap
          div.heart-icon
            img(src="@/assets/images/heart.png")
          span.heart-text 出会いを探してみる
</template>

<script>
import VueScrollTo from "vue-scrollto";

export default {
  name: "ButtonToSearch",
  props: {
    scrollToId: String
  },
  data() {
    return {};
  },
  methods: {
    scrollTo() {
      VueScrollTo.scrollTo(this.scrollToId, 1000, {
        easing: "ease"
      });
    }
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

.search-button-border
  display inline-block
  height 53px
  width 234px
  background #FF6666

.search-button
  display inline-block
  margin-top 3px
  height 47px
  width 228px
  background #FF6666
  color white
  font-size 12px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  border-color white
  border-width 1px
  border-style solid

.button-text-wrap
  position relative
  top -5px
  color white

.heart-icon
  display inline-block
  img
    position relative
    vertical-align middle
    width 50%
    height 50%
</style>
