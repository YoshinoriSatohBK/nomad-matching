<template lang="pug">
  div.page
    div.profile-head
      div.profile-image
        div.image-box
          img(:src="userProfile.imageUrl" v-if="userProfile.imageUrl")
          img(src="@/assets/images/human.png" v-else)
      div.profile-name {{ userProfile.name }}
      ButtonMatchingLarge.worker-button(
        @click="openMatchingModal"
      )

    div.profile-body
      div.profile-icon
        img(src="@/assets/images/tit_profile.png").profile-icon-img
      div.profile-text {{ userProfile.description }}
      div.twitter-account
        span Twitterアカウント：@{{ userProfile.twitterScreenName }}

    div.attributes
      div(v-for="item in attributes").item.columns.is-mobile.is-multiline
        div.item-name.column.is-two-fifths {{ item.name }}
        div.item-value.column {{ item.value }}

    ButtonMatchingLarge.worker-button(
      @click="openMatchingModal"
    )

    SendMessageModal(
      :active="isMatchingModalActive"
      :loading="sendMessageLoading"
      :userProfile="userProfile"
      @close="closeMatchingModal"
      @sendMessage="sendMessage"
    )

    router-link(to="/").back
      span.back-icon
        img(src="@/assets/images/arrow_l.png").back-icon-img
      span.back-text
        span 前のページにもどる
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import ButtonMatchingLarge from "@/components/ButtonMatchingLarge";
import SendMessageModal from "@/components/SendMessageModal";
import { API, graphqlOperation } from "aws-amplify";
import libUser from "../lib/user";
import * as queries from "../graphql/queries";

// import apiMatching from "../api/matching";

export default {
  name: "profile-show",
  components: {
    SectionTitle,
    ButtonMatchingLarge,
    SendMessageModal
  },
  data() {
    return {
      isMatchingModalActive: false,
      userProfile: {},
      sendMessageLoading: false,
      messageLoadingOption: {
        isFullPage: false
      }
    };
  },
  computed: {
    attributes: function() {
      return [
        { name: "移住地", value: this.userProfile.location },
        { name: "職業", value: this.userProfile.skill },
        { name: "年収", value: this.userProfile.incomeRange },
        { name: "ノマド", value: this.userProfile.nomadStatus },
        { name: "タバコ", value: this.userProfile.smoking },
        { name: "アルコール", value: this.userProfile.drink }
      ];
    }
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
    async sendMessage(text) {
      this.sendMessageLoading = true;
      console.log(text);
      //await apiMatching.sendMessage(this.userProfile.id, text);
      this.sendMessageLoading = false;
      this.closeMatchingModal();
      this.$toast.open("メッセージを送信しました");
    }
  }
};
</script>

<style scoped lang="stylus">
.page
  margin 20px 0px 40px

.profile-edit-title
  text-align center

.profile-head
  background-image url("../assets/images/stripe_bg.png")
  background-size 6%
  padding-bottom 40px
  text-align center
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
  margin-bottom 15px

.profile-text
  margin 20px 0px
  font-family Hiragino Kaku Gothic ProN
  font-size 16px
  color #6C5A3F
  line-height 28px

.twitter-account
  font-family Hiragino Kaku Gothic ProN
  font-size 16px
  color #FF6666

.attributes
  text-align center
  background #F5F5F5
  padding 23px 50px
  margin-bottom 30px

.item
  border-top white 1px solid
  &:last-child
    border-bottom white 1px solid

.item-name
  text-align left
  padding-left 0px

.item-value
  text-align left
  padding-left 0px

.back
  margin 22px 0px 10px
  text-align center
  display block

.back-icon-img
  width 19px
  vertical-align middle

.back-text
  position relative
  top -1px
  left 10px
  vertical-align middle
  font-family Hiragino Kaku Gothic ProN
  font-size 12px
  color #6C5A3F
</style>
