<template lang="pug">
  div
    div.my-nav
      b-dropdown(hoverable).my-menu
        a(slot="trigger")
          b-icon(pack="fas" icon="bars" type="is-danger")
        b-dropdown-item プロフィール
        b-dropdown-item(v-if="authenticated" @click="signout()") ログアウト
      div.my-title
        div.logo-pc
          img(src="../assets/images/mark_pc.png")
        div.logo-name Nomad links


    img(src="../assets/images/main_photo.jpg")
    div.catchcopy
      p ノマドワーカー専用のマッチングサイト
      p "nomad links"

    div
      div.button-parent-lg
        div.register-button-border
          div(@click="signin()").register-button
            div.button-text Twitterで登録する
      div.button-parent-lg
        div.search-button-border
          div(@click="signin()").search-button
            div.button-text 出会いを探してみる

    div.section.how-to-use
      h2.section-title 使い方
      div.section-title-border
      carousel(
        :perPage="perPage"
        paginationColor="#FFFFFF"
        paginationActiveColor="#FF6666"
        paginationSize="16"
      )
        slide
          img(src="../assets/images/step1.png").step-image
          div.step-text 気になるノマドを探す
          img(src="../assets/images/step1_pic.png").step-body-image
        slide
          img(src="../assets/images/step2.png").step-image
          div.step-text まずはお茶に誘ってみる
          img(src="../assets/images/step2_pic.png").step-body-image
        slide
          img(src="../assets/images/step3.png").step-image
          div.step-text 相手にメールが届きます。
          img(src="../assets/images/step3_pic.jpg").step-body-image

    div
      div.button-parent-lg
        div.register-button-border
          div(@click="signin()").register-button
            div.button-text Twitterで登録する
      div.button-parent-lg
        div.search-button-border
          div(@click="signin()").search-button
            div.button-text 出会いを探してみる

    div#nomad-list.section
      div.mark-heart
        img(src="../assets/images/mark_heart.png")
      h2.section-title 登録しているノマドワーカー
      div.section-title-border
      div.columns.is-mobile.is-multiline
        div.column.user-item(v-for="user in userList")
          img(:src="user.imageUrl").profile-image
          div.user-info
            div.user-info-name {{ user.name }}
            div.user-info-attr
              span.user-info-attr-item {{ user.location }}
              span.user-info-attr-item {{ user.skill }}
            div.user-info-attr
              span.user-info-attr-item {{ user.income }} 〜 {{ user.income }}
              span.user-info-attr-item {{ user.nomadStatus }}
          div.button-parent-sm
            div.matching-button-border
              div(@click="matching(user)").matching-button
                div.button-text お茶したい

    div.catchcopy
      div.mark-heart
        img(src="../assets/images/mark_pc.png")
      h2.section-title これからは、孤独じゃない
      div.section-title-border
      img(src="../assets/images/nomad_photo.jpg" width="100%")
      p.copy-text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate. commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam vulputate.

    div.catchcopy
      h2.section-title メディア掲載
      div.section-title-border
      div (画像当て込む)

    div.footer
      div
        b-icon(pack="fab" icon="instagram" type="is-white").sns-icon
        b-icon(pack="fab" icon="twitter" type="is-white").sns-icon
        b-icon(pack="fab" icon="youtube" type="is-white").sns-icon
        b-icon(pack="fab" icon="facebook-f" type="is-white").sns-icon
      div.footer-links
        div.columns.is-mobile
          div.column.is-narrow.footer-link 会社概要
          div.column.is-narrow.footer-link 利用規約
          div.column.is-narrow.footer-link 安心・安全の取り組みとガイド
        div.columns.is-mobile
          div.column.is-narrow.footer-link プライバシーポリシー
          div.column.is-narrow.footer-link 特定商取引法に基づく表示
        div.columns.is-mobile
          div.column.is-narrow.footer-link ヘルプ
          div.column.is-narrow.footer-link 記事提供元一覧
      div.credit
        div Produced by マナブ /Developed by Yoshinori /Designed by BEACH CAT
</template>

<style lang="stylus">
.my-nav
  margin 12px 20px

.my-title
  text-align center
  position absolute
  top 0px
  left calc(50% - 80px)
  height 62px
  line-height 62px
  vertical-align middle

.logo-pc
  width 34.45px
  display inline-block

.logo-name
  position relative
  display inline-block
  vertical-align middle
  margin-left 10px
  top -10px
  color #FF6666
  font-weight bold

.section-title
  font-weight bold
  font-size 18px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F
  display inline-block

.section-title-border
  margin 7px auto 12px
  width 112px
  border-bottom solid 2px #6C5A3F

.step-image
  width 70px
  height 40px
  position relative
  left -6px

.step-text
  font-size 14px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F
  margin-bottom 8px

.step-body-image
  width 219px
  height 247.5px

.catchcopy
  text-align center
  line-height 1.8rem
  font-size 14px
  font-family Hiragino Kaku Gothic ProN
  color #6C5A3F

.button-parent-lg
  width 100%
  height 53px
  line-height 53px
  margin 20px auto 0
  text-align center

.button-text
  position relative
  top -3px
  color white

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

.button-parent-sm
  width 100%
  height 30px
  line-height 30px
  text-align center

.matching-button-border
  display inline-block
  height 30px
  width 150px
  background #A68C67

.matching-button
  display inline-block
  text-align center
  margin-top 2px
  height 26px
  width 146px
  background #A68C67
  color white
  font-size 10px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  padding 0
  border-color white
  border-width 1px
  border-style solid

.how-to-use
  text-align center
  background #F5F5F5
  margin 20px 0
  padding 30px !important

#nomad-list
  text-align center
  margin 0px 0
  padding 30px !important

.mark-heart
  width 100%
  img
    display inline-block
    width 30.87px
    height 39.47px

.nomad-list-title
  font-family Hiragino Kaku Gothic ProN
  font-size 18px
  font-weight bold

.profile-image
  width 150px
  height 160px

.user-item
  width 130px
  max-width 170px

.user-info
  color: #6C5A3F
  font-family Hiragino Kaku Gothic ProN
  text-align left
  margin-bottom 10px
  &-name
    font-size 12px
    display inline-block
    margin-bottom 7px
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

.footer
  background #FF6666 !important
  padding 10px !important

.sns-icon
  margin 0 10px

.footer-links
  margin 24px 0 !important
  color white
  font-family Hiragino Kaku Gothic ProN
  font-size 12px

.footer-link
  padding-top 0px !important
  padding-bottom 2px !important

.credit
  color white
  font-family Hiragino Kaku Gothic ProN
  font-size 9px
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
