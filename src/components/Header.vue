<template lang="pug">
  div.my-header
    b-dropdown(hoverable)
      a(slot="trigger")
        img(src="@/assets/images/menu.png").menu-image
      b-dropdown-item(v-if="!authenticated" @click="signin()") Twitterでログイン
      b-dropdown-item(v-if="authenticated" @click="$router.push('/mypage')") プロフィール
      b-dropdown-item(v-if="authenticated" @click="signout()") ログアウト
    div.my-title
      div.logo
        img(src="@/assets/images/logo.png")
</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "Header",
  computed: {
    authenticated: function() {
      return libAuth.authenticated();
    }
  },
  methods: {
    async signin() {
      await libAuth.authenticate();
    },
    async signout() {
      await libAuth.clearAuthentication();
    }
  }
};
</script>

<style scoped lang="stylus">
.menu-image
  width 24.33px
  height 21.57px
  position relative
  top 9px
  left 10px

.my-header
  padding 0px 20px
  height 63px
  line-height 63px
  border 1px #EDEDED solid

.my-title
  text-align center
  position absolute
  top 0%
  left calc(50% - 98px)

.logo
  width 195.33px
  height 41.26px
  display inline-block
  vertical-align middle
  position relative
  top -4px
</style>
