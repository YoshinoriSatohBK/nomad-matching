<template lang="pug">
  div.button-parent
    div.register-button-border
      div(@click="signin()").register-button
        div.button-text-wrap
          div.twitter-icon
            img(src="@/assets/images/twitter.png")
          span.twitter-text Twitterで登録する
</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "ButtonRegisterTwitter",
  methods: {
    async signin() {
      if (await libAuth.authenticated()) {
        this.$toast.open("ログインしています");
      }
      await libAuth.authenticate();
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

.register-button-border
  display inline-block
  height 53px
  width 234px
  background #597E96

.register-button
  display inline-block
  margin-top 3px
  height 47px
  width 228px
  background #597E96
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

.twitter-text
  position relative
  left -5px

.twitter-icon
  display inline-block
  img
    position relative
    top 0px
    vertical-align middle
    width 50%
    height 50%
</style>
