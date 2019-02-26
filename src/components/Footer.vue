<template lang="pug">
  div.footer
    div.sns-icons
      a(href="https://www.instagram.com/manabubannai/" target="_blank")
        b-icon(pack="fab" icon="instagram" type="is-white" size="is-small").sns-icon
      a(href="https://twitter.com/manabubannai" target="_blank")
        b-icon(pack="fab" icon="twitter" type="is-white" size="is-small").sns-icon
      a(href="https://manablog.org/" target="_blank")
        b-icon(pack="fas" icon="blog" type="is-white" size="is-small").sns-icon
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

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="stylus">
.footer
  background #FF6666 !important
  padding 10px !important

.sns-icons
  margin-bottom 20px

.sns-icon
  margin 0 10px

.footer-links
  margin 40px 10px !important
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
