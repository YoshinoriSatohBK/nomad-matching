<template lang="pug">
  div
    h1 プロフィール登録

    b-field(label="名前")
      b-input(v-model="name")

    b-field(label="メールアドレス")
      b-input(type="email" v-model="email")
    <!--div-->
      <!--p プロフィール画像-->
      <!--input(type="text" v-model="imageUrl")-->
    b-field(label="地域")
      b-input(v-model="location")

    b-field(label="年収")
      b-input(v-model="income")

    b-field(label="スキル")
      b-input(v-model="skill")

    b-field(label="喫煙" )
      b-select(v-model="smoking")
        option(value="true") 吸う
        option(value="false") 吸わない

    b-field(label="アルコール" )
      b-select(v-model="drink")
        option(value="true") 飲む
        option(value="false") 飲まない

    b-field(label="ノマド" )
      b-select(v-model="nomadStatus")
        option(value="nomad") 達成済み
        option(value="running") 目指している
        option(value="other") その他

    div
      button.button.is-primary(@click="saveProfile()") save
      button.button(@click="$router.push('/')") 戻る
</template>

<script>
export default {
  name: "user-profile",
  components: {},
  async mounted() {
    await this.$store.dispatch("authUser/fetchUserProfile");
    if (this.userProfile && this.userProfile.id) {
      this.name = this.userProfile.name;
      this.email = this.userProfile.email;
      this.imageUrl = this.userProfile.imageUrl;
      await this.$store.dispatch("twitter/clearUser");
    } else if (this.twitterUser) {
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
      location: "中野区",
      income: 0,
      skill: "AWS",
      smoking: false,
      drink: false,
      nomadStatus: "nomad",
      smokingOptions: []
    };
  },
  computed: {
    twitterUser: function() {
      return this.$store.state.twitter.user;
    },
    userProfile: function() {
      return this.$store.state.authUser.userProfile;
    }
  },
  methods: {
    async saveProfile() {
      const profile = {
        name: this.name,
        email: this.email,
        imageUrl: this.imageUrl,
        location: this.location,
        income: this.income,
        skill: this.skill,
        smoking: this.smoking,
        drink: true,
        nomadStatus: this.nomadStatus
      };
      await this.$store.dispatch("authUser/saveUserProfile", {
        profile: profile
      });
      this.$toast.open("プロフィールを登録しました！");
      setTimeout(() => {
        this.$router.push("/");
      }, 1750);
    }
  }
};
</script>
