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
        name="name"
        type="text"
        placeholder="お名前"
        v-model="profile.name"
        v-validate="'required'"
        data-vv-as="お名前"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('name')"
          :text="errors.first('name')"
        )

      FieldInput(
        name="email"
        type="email"
        placeholder="メールアドレス"
        v-model="profile.email"
        v-validate="'required|email'"
        data-vv-as="メールアドレス"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('email')"
          :text="errors.first('email')"
        )

      div.auto-wrap
        b-field
          b-autocomplete.auto-wrap-field(
            name="location"
            v-model="profile.location"
            v-validate="'required'"
            data-vv-as="移住地"
            :data="filteredLocations"
            placeholder="移住地"
            @select="option => location = option"
          )
        ErrorMessage(
          v-if="hasValidationError && errors.has('location')"
          :text="errors.first('location')"
        )

      FieldInput(
        name="skill"
        type="text"
        placeholder="職業"
        v-model="profile.skill"
        v-validate="'required'"
        data-vv-as="職業"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('skill')"
          :text="errors.first('skill')"
        )
      FieldInput(
        name="income"
        type="text"
        placeholder="年収"
        v-model="profile.income"
        v-validate="'required|integer'"
        data-vv-as="年収"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('income')"
          :text="errors.first('income')"
        )
      FieldSelect(
        name="nomadStatus"
        placeholder="ノマド達成度"
        v-model="profile.nomadStatus"
        :options="nomadStatusOptions"
        v-validate="'required'"
        data-vv-as="ノマド達成度"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('nomadStatus')"
          :text="errors.first('nomadStatus')"
        )
      FieldSelect(
        name="smoking"
        placeholder="タバコ"
        v-model="profile.smoking"
        :options="smokingOptions"
        v-validate="'required'"
        data-vv-as="タバコ"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('smoking')"
          :text="errors.first('smoking')"
        )
      FieldSelect(
        name="drink"
        placeholder="アルコール"
        v-model="profile.drink"
        :options="drinkOptions"
        v-validate="'required'"
        data-vv-as="アルコール"
      )
        ErrorMessage(
          v-if="hasValidationError && errors.has('drink')"
          :text="errors.first('drink')"
        )

    ErrorMessage.all-error-message(
      v-if="hasValidationError && errors.items.length > 0"
      text="入力にエラーがあります"
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
import ErrorMessage from "../components/ErrorMessage";

export default {
  name: "profile-edit",
  components: {
    ErrorMessage,
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
        skill: "",
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
      ],
      hasValidationError: false
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
      this.hasValidationError = !(await this.$validator.validate());
      if (this.hasValidationError) {
        return;
      }

      await this.$store.dispatch("route/enableLoading");
      await this.$store.dispatch("user/saveAuthUserProfile", {
        profile: this.profile
      });
      if (this.imageFile) {
        await libUser.putUserImageFile(this.userProfile, this.imageFile);
      }

      setTimeout(() => {
        this.$toast.open("プロフィールを登録しました");
        this.$router.push("/");
      }, 1700);
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
  margin 20px auto 60px

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

.error-message
  text-align left

.all-error-message
  text-align center
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
      width 100%
      height 43.68px
      &::placeholder
        color: #AF9772
        font-family Hiragino Kaku Gothic ProN
        font-size 16px
</style>
