<template lang="pug">
div.modal(:class="{ 'is-active': active}")
  div.modal-background
  div.modal-content
    header.modal-card-head.title
      p.modal-card-title お茶に誘ってみる
      button.delete(@click.stop="closeModal" aria-label="close")
    section.modal-card-body.body-modal
      div.profile-head
        div.profile-image
          div.image-box
            img(:src="userProfile.imageUrl" v-if="userProfile.imageUrl")
            img(src="@/assets/images/human.png" v-else)
        div.profile-name {{ userProfile.name }}
        div.message-guide メッセージを送ってみましょう！
      div.profile-message
        // img.message-icon(src="@/assets/images/tit_profile.png")
        b-field
          b-input(type="textarea" v-model="mailMessage" :placeholder="placeholder")
        ButtonMatching(
          @matching="sendMessage"
          text="送信する"
          size="large"
          icon="heart"
        )
  b-loading(
    :active.sync="loading"
    :is-full-page="loadingOption.isFullPage"
  )
</template>

<script>
import ButtonMatching from "@/components/ButtonMatching";
export default {
  data() {
    return {
      loadingOption: {
        isFullPage: false
      },
      placeholder:
        "例：こんにちは、現在バンコクでノマド生活をしているマナブと申します。\n\n○○さんのプロフィールを見て、職種が同じで興味を持ちました。バンコクでお茶などいかがでしょうか？"
    };
  },
  components: {
    ButtonMatching
  },
  props: {
    active: Boolean,
    loading: Boolean,
    userProfile: Object
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    sendMessage() {
      this.$emit("sendMessage");
    }
  }
};
</script>

<style scoped lang="stylus">
.modal-card-body
  padding 0px

.title
  background #FF6666
  font-family Hiragino Kaku Gothic ProN
  font-size 18px
  margin-bottom 0px !important
  p
    color white

.profile-head
  background-image url("../assets/images/stripe_bg.png")
  background-size 6%
  padding-top 0.8rem
  padding-bottom 1.2rem
  text-align center
  color: #6C5A3F
  font-family Hiragino Kaku Gothic ProN
  font-size 20px
  border-bottom #6C5A3F 2px solid

.profile-image
  margin-bottom #6C5A3F 1px solid

.profile-body
  padding 30px

.profile-icon
  text-align center

.profile-icon-img
  height 50px

.image-box
  display inline-block
  margin 20px 20px 3px
  height 250px
  img
    max-width 234px
    max-height 250px

.profile-name
  font-family Hiragino Kaku Gothic ProN
  font-size 20px
  color #6C5A3F
  margin-top 0.3rem
  margin-bottom 1.4rem

.message-guide
  color: #6C5A3F
  font-family Hiragino Kaku Gothic ProN
  font-size 16px

.profile-message
  background #F5F5F5
  padding 2rem

.message-editor
  font-family Hiragino Kaku Gothic ProN
  font-size 16px
  color #6C5A3F
</style>
