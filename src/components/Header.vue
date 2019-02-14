<template lang="pug">
  div.my-header
    transition(name="slide-fade")
      div.menu(v-show="isShowMenu")
        img(src="@/assets/images/menu_close.png" @click="hideMenu").menu-close-image
        router-link(to="/").menu-item
          span.menu-item-text ホーム
        router-link(to="/mypage" v-if="authenticated").menu-item
          span.menu-item-text プロフィール設定
        div(v-if="authenticated").menu-item
          span(@click="signout()").menu-item-text ログアウト
        div(v-if="!authenticated").menu-item
          span(@click="signin()").menu-item-text Twitterでログイン
    div.menu-burger(@click="showMenu")
      img(src="@/assets/images/menu.png").menu-image
    div.my-title
      router-link(to="/").logo
        img(src="@/assets/images/logo.png")
</template>

<script>
import libAuth from "../lib/auth";

export default {
  name: "Header",
  computed: {
    authenticated: function() {
      return libAuth.authenticated();
    },
    isShowMenu: function() {
      return this.$store.state.route.showMenu;
    }
  },
  methods: {
    async signin() {
      await libAuth.authenticate();
    },
    async signout() {
      await this.hideMenu();
      await libAuth.clearAuthentication();
      this.$toast.open("ログアウトしました");
    },
    async showMenu() {
      await this.$store.dispatch("route/showMenu");
    },
    async hideMenu() {
      await this.$store.dispatch("route/hideMenu");
    }
  }
};
</script>

<style scoped lang="stylus">
.menu
  display inline-block
  position absolute
  background white
  width 231px
  z-index 100
  padding 4px 18px

.menu-item
  display block
  text-align center
  height 55px
  border-bottom #AF9772 1px solid
  &:last-child
    border-bottom none

.menu-item-text
  font-family Hiragino Kaku Gothic ProN
  font-size 16px
  color #FF6666
  position relative
  top -2px

.menu-image
  width 24.33px
  height 21.57px
  position absolute
  top 20px
  left 23px

.menu-close-image
  width 24.33px
  height 21.57px
  position absolute
  top 20px
  left 23px
  z-index 500

.my-header
  padding 0px 0px
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

.slide-fade-enter-active, .slide-fade-leave-active
  transition: all .3s ease-out;

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(-40px);
  opacity: 0;
</style>
