<template lang="pug">
  div
    h1 user profile

    div
      p email
      input(type="text")

    div
      p プロフィール画像
      input(type="text")

    div
      p 地域
      input(type="text")

    div
      p 年収
      input(type="text")

    div
      p スキル
      input(type="text")

    div
      p タバコ
      input(type="text")

    div
      p アルコール
      input(type="text")

    div
      p ノマドステータス
      input(type="text")

    div
      button(@click="saveProfile()") save
</template>

<script>
// import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export default {
  name: "user-profile",
  components: {},
  methods: {
    async saveProfile() {
      console.log(this.$store);
      const twitterUser = this.$store.getters.getTwitterUser;
      const appUser = {
        id: this.$store.getters.getIdentityId,
        email: twitterUser.email,
        profileImageUrl: twitterUser.profile_image_url_https,
        name: twitterUser.name,
        screenName: twitterUser.screen_name
      };
      console.log(appUser);

      const newUser = await API.graphql(
        graphqlOperation(mutations.createUserProfile, { input: appUser })
      );
      console.log(newUser);
    }
  }
};
</script>
