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

    img(src="../assets/photo_main.jpg" width="100%")
    div.catchcopy
      p ノマドワーカー専用のマッチングサイト
      p "nomad links"

    div
      button(@click="signin()").register-button Twitterで登録する
      button.search-button 出会いを探してみる

    div.section.how-to-use
      h2 使い方
      div -----
      carousel(
        :perPage="perPage"
        paginationColor="#FFFFFF"
        paginationActiveColor="#FF6666"
        paginationSize="16"
      )
        slide
          div step1
          div 気になるノマドを探す
          div （画像当て込む）
        slide
          div step2
          div まずはお茶に誘ってみる
          div （画像当て込む）
        slide
          div step3
          div 相手にメールが届きます
          div （画像当て込む）

    div
      button(@click="signin()").register-button Twitterで登録する
      button.search-button 出会いを探してみる

    div#nomad-list.section
      h2.nomad-list-title 登録しているノマドワーカー
      div -----
      div.columns.is-mobile
        template(v-for="user in userList")
          div.column.user-item
            img(:src="user.imageUrl").profile-image
            div.user-info
              div.user-info-name {{ user.name }}
              div.user-info-attr
                span.user-info-attr-item {{ user.location }}
                span.user-info-attr-item {{ user.skill }}
              div.user-info-attr
                span.user-info-attr-item {{ user.income }} 〜 {{ user.income }}
                span.user-info-attr-item {{ user.nomadStatus }}
            button(@click="matching(user)").matching-button お茶したい
          div.column.user-item
            img(:src="user.imageUrl").profile-image
            div.user-info
              div.user-info-name {{ user.name }}
              div.user-info-attr
                span.user-info-attr-item {{ user.location }}
                span.user-info-attr-item {{ user.skill }}
              div.user-info-attr
                span.user-info-attr-item {{ user.income }} 〜 {{ user.income }}
                span.user-info-attr-item {{ user.nomadStatus }}
            button(@click="matching(user)").matching-button お茶したい

    div.catchcopy
      h2.nomad-list-title これからは、孤独じゃない
      div -----
      img(src="../assets/photo_end.jpg" width="100%")
      p.copy-text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate. commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam vulputate.

    div.catchcopy
      h2.nomad-list-title メディア掲載
      div -----
      div (画像当て込む)

    div.footer
      b-icon(pack="fas" icon="twitter-square" type="is-danger")
      b-icon(pack="fas" icon="bars" type="is-danger")
</template>

<style lang="stylus">
.my-nav
  margin 12px 20px
.my-title
  text-align center
  position absolute
  top 13px
  left calc(50% - 80px)
.my-title-body
  width 160px
.catchcopy
  text-align center
  line-height 1.8rem
  font-size 14px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F

.register-button
  display block
  text-align center
  height 53px
  width 234px
  margin 20px auto 0
  background #597E96
  color white
  font-size 12px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN

.search-button
  display block
  text-align center
  height 53px
  width 234px
  margin 20px auto 0
  background #FF6666
  color white
  font-size 12px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN

.matching-button
  display block
  text-align center
  height 30px
  width 150px
  margin 4px auto 0
  background #A68C67
  color white
  font-size 12px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  padding 0

.how-to-use
  text-align center
  background #F5F5F5
  margin 20px 0
  padding 30px !important

#nomad-list
  text-align center
  margin 20px 0
  padding 30px !important

.nomad-list-title
  font-family Hiragino Kaku Gothic ProN
  font-size 18px
  font-weight bold

.profile-image
  width 150px
  height 160px

.user-item
  width 150px

.user-info
  color: #6C5A3F
  font-family Hiragino Kaku Gothic ProN
  text-align left
  &-name
    font-size 12px
    display inline-block
    margin-bottom 10px
  &-attr
    font-size 10px
    &-item
      display inline-block
      margin-right 18px

.copy-text
  color #6C5A3F
  font-size 11px
  font-family Hiragino Kaku Gothic ProN
  line-height 1.2rem
  text-align left
  padding 8px 20px
  margin-bottom 60px
</style>

<script>
import libAuth from "../lib/auth";
import BDropdown from "buefy/src/components/dropdown/Dropdown";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "top",
  components: {
    BDropdown,
    Carousel,
    Slide
  },
  data() {
    return {
      perPage: 1
    };
  },
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
