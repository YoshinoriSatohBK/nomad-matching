<template lang="pug">
  div
    div.my-nav
      b-dropdown(hoverable).my-menu
        a(slot="trigger")
          b-icon(pack="fas" icon="bars" type="is-danger")
        b-dropdown-item プロフィール
        b-dropdown-item(v-if="authenticated" @click="signout()") ログアウト
      div.my-title
        div.my-title-body Logo Nomad links
      div.is-clearfix

    img(src="../assets/photo_main.jpg" width="100%")
    div.catchcopy
      p ノマドワーカー専用のマッチングサイト
      p "nomad links"
    div.buttons
      button(v-if="!authenticated" @click="signin()") Twitterで登録する
      div
        a(href="#nomad-list").nomad-list-link 出会いを探してみる
    div#nomad-list
      p 登録しているノマドワーカー
      div 検索条件
      ul
        li(v-for="user in userList")
          div
            img(:src="user.imageUrl")
            div {{ user.name }}
            div {{ user.location }}
            div {{ user.skill }}
            div {{ user.income }} 〜 {{ user.income }}
            div {{ user.nomadStatus }}
            button(@click="matching(user)") お茶したい
</template>

<style lang="stylus">
.my-nav
  margin 12px 20px
.my-menu
  float left
.my-title
  text-align center
  position fixed
  left calc(50% - 80px)
.my-title-body
  width 160px
.catchcopy
  text-align center
.buttons
  text-align center
.nomad-list-link
  display block
</style>

<script>
import libAuth from "../lib/auth";
import BDropdown from "buefy/src/components/dropdown/Dropdown";

export default {
  name: "top",
  components: { BDropdown },
  computed: {
    authenticated: function() {
      return libAuth.authenticated();
    },
    userList: function() {
      return this.$store.state.users.publicList;
    }
  },
  async mounted() {
    await this.$store.dispatch("users/fetchUserList");
  },
  methods: {
    async signin() {
      await libAuth.authenticate();
    },
    async signout() {
      await libAuth.clearAuthentication();
    },
    async matching(user) {
      location.href =
        "mailto:" +
        user.email +
        "?subject=お茶しませんか" +
        "&body=お茶しませんか";
    }
  }
};
</script>
