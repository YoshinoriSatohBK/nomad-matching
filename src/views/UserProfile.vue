<template lang="pug">
  div
    h1 user profile

    div
      p 名前
      input(type="text" v-model="name")

    div
      p メールアドレス
      input(type="text" v-model="email")

    div
      p プロフィール画像
      input(type="text" v-model="imageUrl")

    div
      p 地域
      input(type="text" v-model="location")

    div
      p 年収
      input(type="text" v-model="income")

    div
      p スキル
      input(type="text" v-model="skill")

    div
      p 喫煙
      input(type="radio" name="smoking" value="true" v-model="smoking")
      span する
      input(type="radio" name="smoking" value="false" v-model="smoking")
      span しない

    div
      p アルコール
      input(type="radio" name="smoking" value="true" v-model="drink")
      span 飲む
      input(type="radio" name="smoking" value="false" v-model="drink")
      span 飲まない

    div
      p ノマドステータス
      input(type="radio" name="smoking" value="nomad" v-model="nomadStatus")
      span 現時点でノマド
      input(type="radio" name="smoking" value="future" v-model="nomadStatus")
      span 将来的に目指している

    div
      button(@click="saveProfile()") save
</template>

<script>
export default {
  name: "user-profile",
  components: {},
  mounted() {
    if (this.twitterUser) {
      this.name = this.twitterUser.name;
      this.email = this.twitterUser.email;
      this.imageUrl = this.twitterUser.profile_image_url_https;
    }
  },
  data() {
    return {
      name: "",
      email: "",
      imageUrl: "",
      location: "",
      income: "",
      skill: "",
      smoking: false,
      drink: false,
      nomadStatus: "noamd"
    };
  },
  computed: {
    twitterUser: function() {
      return this.$store.state.twitter.user;
    }
  },
  methods: {
    async saveProfile() {
      const profile = {
        id: this.identityId,
        name: this.name,
        email: this.email,
        imageUrl: this.imageUrl,
        location: this.location,
        income: this.income,
        skill: this.skill,
        smoking: this.smoking,
        drink: this.drink,
        nomadStatus: this.nomadStatus
      };
      console.log(profile);
      await this.$store.dispatch("twitter/clearAuth");
      await this.$store.dispatch("authUser/fetchUserProfile");
    }
  }
};
</script>
