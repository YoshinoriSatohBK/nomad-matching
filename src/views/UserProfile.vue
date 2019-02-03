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
export default {
  name: "user-profile",
  components: {},
  computed: {
    twitterUser: function() {
      return this.$store.state.twitterUser;
    },
    identityId: function() {
      return this.$store.state.identityId;
    }
  },
  methods: {
    async saveProfile() {
      const appUser = {
        id: this.identityId,
        email: this.twitterUser.email,
        profileImageUrl: this.twitterUser.profile_image_url_https,
        name: this.twitterUser.name,
        screenName: this.twitterUser.screen_name
      };
      console.log(appUser);

      await this.$store.dispatch("userProfile/fetchUserProfile");
    }
  }
};
</script>
