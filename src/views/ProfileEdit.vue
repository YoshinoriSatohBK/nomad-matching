<template lang="pug">
  div
    div.profile-edit-title
      SectionTitle(text="プロフィール設定")

    div.profile-image
      div.image-box
        img(src="@/assets/images/human.png")
        b-field
          b-upload(v-model="file")
            div.camera-icon-wrap
              b-icon.camera-icon(
                pack="fas"
                icon="camera"
                type="is-white"
                custom-size="profile-edit--camera-icon"
              )


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
      console.log("exist user profile");
      this.name = this.userProfile.name;
      this.email = this.userProfile.email;
      this.imageUrl = this.userProfile.imageUrl;
      this.location = this.userProfile.location;
      this.income = this.userProfile.income;
      this.skill = this.userProfile.skill;
      this.smoking = this.userProfile.smoking;
      this.drink = this.userProfile.drink;
      this.nomadStatus = this.userProfile.nomadStatus;
      this.smokingOptions = this.userProfile.smokingOptions;
      await this.$store.dispatch("twitter/clearUser");
    } else if (this.twitterUser) {
      console.log("exist twitterUser");
      this.name = this.twitterUser.name;
      this.email = this.twitterUser.email;
      this.imageUrl = this.twitterUser.profile_image_url_https;
    } else {
      console.log("not exists");
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

<style scoped lang="stylus">
.profile-edit-title
  text-align center

.profile-image
  text-align center

.image-box
  display inline-block
  text-align center
  width 234px
  height 250px

.camera-icon-wrap
  display inline-block
  position relative
  top -60px
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
</style>

<style lang="stylus">
.profile-edit--camera-icon
  width 42.2px
  height 32.25px
  font-size 33px
  position relative
  top calc(50% - 19px)
  left calc(50% - 15px)
</style>
