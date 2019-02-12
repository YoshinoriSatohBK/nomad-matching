<template lang="pug">
  div
    div.profile-image
      div.profile-edit-title
        SectionTitle(text="プロフィール設定")
      div.image-box
        img(:src="selectedImageData" v-if="selectedImageData")
        img(:src="imageUrl" v-else-if="imageUrl")
        img(src="@/assets/images/human.png" v-else)
      b-field.upload-field
        b-upload(@input="uploadEvent")
          div.camera-icon-wrap
            b-icon.camera-icon(
              pack="fas"
              icon="camera"
              type="is-white"
              custom-size="profile-edit--camera-icon"
            )

    div.attributes
      FieldInput(
        type="text"
        placeholder="お名前"
        v-model="profile.name"
      )
      FieldInput(
        type="email"
        placeholder="メールアドレス"
        v-model="profile.email"
      )

      div.auto-wrap
        b-field
          b-autocomplete(
            v-model="profile.location"
            :data="filteredLocations"
            placeholder="移住地"
            @select="option => location = option"
          )

      FieldInput(
        type="text"
        placeholder="職業"
        v-model="profile.skill"
      )
      FieldInput(
        type="text"
        placeholder="年収"
        v-model="profile.income"
      )
      FieldSelect(
        placeholder="ノマド達成度"
        v-model="profile.nomadStatus"
        :options="nomadStatusOptions"
      )
      FieldSelect(
        placeholder="タバコ"
        v-model="profile.smoking"
        :options="smokingOptions"
      )
      FieldSelect(
        placeholder="アルコール"
        v-model="profile.drink"
        :options="drinkOptions"
      )
    ButtonRegisterProfile.register-button(
      @save-profile="saveProfile"
    )

</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import ButtonRegisterProfile from "@/components/ButtonRegisterProfile";
import FieldInput from "@/components/FieldInput";
import FieldSelect from "@/components/FieldSelect";
import BField from "buefy/src/components/field/Field";
import BAutocomplete from "buefy/src/components/autocomplete/Autocomplete";
import libUser from "../lib/user";

export default {
  name: "profile-edit",
  components: {
    BAutocomplete,
    BField,
    SectionTitle,
    ButtonRegisterProfile,
    FieldInput,
    FieldSelect
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthUserProfile");
    if (this.userProfile && this.userProfile.id) {
      this.imageUrl = await libUser.getUserImageUrl(this.userProfile);
      this.profile = Object.assign({}, this.userProfile);

      if (
        this.profile.description !== this.twitterUser.description ||
        this.profile.twitterScreenName !== this.twitterUser.screen_name
      ) {
        if (this.twitterUser.description !== "") {
          this.profile.description = this.twitterUser.description;
        }
        this.profile.twitterScreenName = this.twitterUser.screen_name;
        await this.$store.dispatch("user/saveAuthUserProfile", {
          profile: this.profile
        });
      }
    } else if (this.twitterUser) {
      this.profile.name = this.twitterUser.name;
      this.profile.email = this.twitterUser.email;
      if (this.twitterUser.description !== "") {
        this.profile.description = this.twitterUser.description;
      }
      this.profile.twitterScreenName = this.twitterUser.screen_name;
    } else {
      console.log("not exists");
    }
  },
  data() {
    return {
      profile: {
        name: null,
        email: null,
        description: null,
        twitterScreenName: null,
        location: null,
        income: null,
        skill: null,
        smoking: null,
        drink: null,
        nomadStatus: null
      },
      imageUrl: null,
      selectedImageData: null,
      imageFile: null,
      locations: ["日本", "バンコク", "アメリカ", "オーストラリア"],
      smokingOptions: [
        {
          value: true,
          displayValue: "吸う"
        },
        {
          value: false,
          displayValue: "吸わない"
        }
      ],
      drinkOptions: [
        {
          value: true,
          displayValue: "飲む"
        },
        {
          value: false,
          displayValue: "飲まない"
        }
      ],
      nomadStatusOptions: [
        {
          value: "nomad",
          displayValue: "ノマド達成済み"
        },
        {
          value: "goingNomad",
          displayValue: "目指している"
        },
        {
          value: "notNomad",
          displayValue: "ノマドではない"
        }
      ]
    };
  },
  computed: {
    twitterUser: function() {
      return this.$store.state.twitter.user;
    },
    userProfile: function() {
      return this.$store.state.user.authUserProfile;
    },
    filteredLocations() {
      return this.locations.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.location) >= 0
        );
      });
    }
  },
  methods: {
    async saveProfile() {
      console.log(this.profile);
      await this.$store.dispatch("user/saveAuthUserProfile", {
        profile: this.profile
      });
      if (this.imageFile) {
        await libUser.putUserImageFile(this.userProfile, this.imageFile);
      }

      this.$toast.open("プロフィールを登録しました");
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
    uploadEvent(file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = async event => {
        this.selectedImageData = event.target.result;
      };
      reader.readAsDataURL(file);
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
