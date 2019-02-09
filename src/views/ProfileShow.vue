<template lang="pug">
  div
    SectionTitle(text="プロフィール設定")

    b-field
      b-upload(native drag-drop v-model="imageUrl")
      section.section
        div.content.has-text-centered
          p
            b-icon(
              icon="upload"
              size="is-large"
            )
          p Drop your files here or click to upload

    b-field(label="名前")
      b-input(v-model="name")

    b-field(label="メールアドレス")
      b-input(type="email" v-model="email")

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
import SectionTitle from "@/components/SectionTitle";

export default {
  name: "profile-edit",
  components: {
    SectionTitle
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthUserProfile");
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
      location: "",
      income: 0,
      skill: "",
      smoking: false,
      drink: false,
      nomadStatus: "",
      smokingOptions: []
    };
  },
  computed: {
    twitterUser: function() {
      return this.$store.state.twitter.user;
    },
    userProfile: function() {
      return this.$store.state.user.authUserProfile;
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
      await this.$store.dispatch("user/saveAuthUserProfile", {
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
