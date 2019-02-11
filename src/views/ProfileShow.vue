<template lang="pug">
  div
    div.profile-image
      div.image-box
        img(:src="userProfile.imageUrl" v-if="userProfile.imageUrl")
        img(src="@/assets/images/human.png" v-else)
      div {{ name }}
      ButtonMatching.worker-button(
        @matching="clickMatching"
      )

    div.profile-body
      img(src="@/assets/images/tit_profile.png")
      div.profile-text {{ userProfile.description }}
      div.twitter-account
        span Twitterアカウント：{{ userProfile.twitterScreenName }}

    div.attributes
      div.item
        div.item-name 移住地
        div.item-value {{ userProfile.location }}
      div.item
        div.item-name 職業
        div.item-value {{ userProfile.skill }}
      div.item
        div.item-name 年収
        div.item-value {{ userProfile.incomeRange }}
      div.item
        div.item-name ノマド
        div.item-value {{ userProfile.nomadStatus }}
      div.item
        div.item-name タバコ
        div.item-value {{ userProfile.smoking }}
      div.item
        div.item-name アルコール
        div.item-value {{ userProfile.drink }}

    ButtonMatching.worker-button(
      @matching="sendMessage()"
    )
    b-loading(
      :active.sync="sendMessageLoading"
      :is-full-page="messageLoadingOption.isFullPage"
    )

</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import ButtonMatching from "@/components/ButtonMatching";
import { API, graphqlOperation } from "aws-amplify";
import libUser from "../lib/user";
import * as queries from "../graphql/queries";

export default {
  name: "profile-edit",
  components: {
    SectionTitle,
    ButtonMatching
  },
  data() {
    return {
      isMatchingModalActive: false,
      userProfile: null,
      sendMessageLoading: false,
      messageLoadingOption: {
        isFullPage: false
      }
    };
  },
  async mounted() {
    console.log("ProfileShow mounted");
    console.log(this.$route.params.id);
    const userProfile = await API.graphql(
      graphqlOperation(queries.getUserProfile, { id: this.$route.params.id })
    );
    console.log(userProfile);
    this.userProfile = await libUser.getDisplayUser(
      userProfile.data.getUserProfile
    );
    console.log(this.userProfile);
  },
  methods: {
    openMatchingModal() {
      this.isMatchingModalActive = true;
    },
    closeMatchingModal() {
      this.isMatchingModalActive = false;
    },
    sendMessage() {
      this.sendMessageLoading = true;
      const that = this;
      setTimeout(function() {
        that.sendMessageLoading = false;
        that.closeMatchingModal();
        that.$toast.open(
          "メッセージを送信しました（未実装です。実際にはまだ送信されません。）"
        );
      }, 2000);
    }
  }
};
</script>

<style scoped lang="stylus">
.profile-edit-title
  text-align center

.profile-image
  text-align center
  padding-top 20px
  padding-bottom 35px
  margin-bottom #6C5A3F 1px solid

.image-box
  display inline-block
  text-align center
  margin 14px
  height 250px
  img
    max-width 234px
    max-height 250px

.upload-field
  height 0px

.camera-icon-wrap
  display inline-block
  position relative
  top -75px
  left 105px
  width 73px
  height 73px
  border-radius 100%
  background #AF9772
  opacity 0.6

.camera-icon
  width 73px
  height 73px
  display inline-block


.register-button
  margin 40px auto 60px

.attributes
  text-align center
  background #F5F5F5
  padding 42px 25px

.field-autocomplete
  border #AF9772 1px solid
  border-radius 0%
  background white
  width 324px !important
  height 43.68px

.auto-wrap
  margin 0 0 0.7rem 0
  text-align center !important
</style>

<style lang="stylus">
.profile-edit--camera-icon
  width 42.2px
  height 32.25px
  font-size 37px
  position relative
  top calc(50% - 19px)
  left calc(50% - 17px)

.autocomplete
  .control
    text-align center !important
    input.input
      border-radius 0% !important
      border #AF9772 1px solid !important
      padding-left 1rem
      width 324px
      height 43.68px
      &::placeholder
        color: #AF9772
        font-family Hiragino Kaku Gothic ProN
        font-size 16px
</style>
