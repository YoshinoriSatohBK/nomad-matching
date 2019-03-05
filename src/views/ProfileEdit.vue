<template lang="pug">
  div
    ProfileEditImage(
      :selectedImageData="selectedImageData"
      :imageUrl="imageUrl"
      @input="uploadEvent"
    )

    div.attributes
      FieldInputEdit.attributes-field(
        name="name"
        type="text"
        placeholder="お名前"
        v-model="profile.name"
        v-validate="'required'"
        data-vv-as="お名前"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldInputEdit.attributes-field(
        name="email"
        type="email"
        placeholder="メールアドレス"
        v-model="profile.email"
        v-validate="'required|email'"
        data-vv-as="メールアドレス"
        :hasValidationError="hasValidationError"
        :errors="errors"
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

      FieldInputEdit.attributes-field(
        name="skill"
        type="text"
        placeholder="職業"
        v-model="profile.skill"
        v-validate="'required'"
        data-vv-as="職業"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldInputEdit.attributes-field(
        name="income"
        type="text"
        placeholder="年収"
        unit="万円"
        v-model="profile.income"
        v-validate="'required|integer'"
        data-vv-as="年収"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldSelectEdit.attributes-field(
        name="nomadStatus"
        placeholder="ノマド達成度"
        v-model="profile.nomadStatus"
        :options="nomadStatusOptions"
        v-validate="'required'"
        data-vv-as="ノマド達成度"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldSelectEdit.attributes-field(
        name="smoking"
        placeholder="タバコ"
        v-model="profile.smoking"
        :options="smokingOptions"
        v-validate="'required'"
        data-vv-as="タバコ"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldSelectEdit(
        :class="{'attributes-field': !userRegisted()}"
        name="drink"
        placeholder="アルコール"
        v-model="profile.drink"
        :options="drinkOptions"
        v-validate="'required'"
        data-vv-as="アルコール"
        :hasValidationError="hasValidationError"
        :errors="errors"
      )

      FieldCheckboxEdit(
        v-if="!userRegisted()"
        name="mailApproved"
        type="checkbox"
        label="ユーザーからのメールの受信に同意します"
        v-model="mailApproved"
        v-validate="'required:invalidateFalse'"
        data-vv-as="メール受信の同意"
        :hasValidationError="hasValidationError"
        :errors="errors"
        errorMessage="メール受信の同意は必須です"
      )

    ErrorMessage.all-error-message(
      v-if="hasValidationError && errors.items.length > 0"
      text="入力にエラーがあります"
    )
    ErrorMessage.all-error-message(
      v-if="hasApiError"
      text="登録時にエラーが発生しました"
    )
    ButtonRegisterProfile.register-button(
      @click="saveProfile"
    )
</template>

<script>
import ProfileEditImage from "@/components/ProfileEditImage";
import SectionTitle from "@/components/SectionTitle";
import ButtonRegisterProfile from "@/components/ButtonRegisterProfile";
import FieldInputEdit from "@/components/FieldInputEdit";
import FieldSelectEdit from "@/components/FieldSelectEdit";
import FieldCheckboxEdit from "@/components/FieldCheckboxEdit";
import BField from "buefy/src/components/field/Field";
import BAutocomplete from "buefy/src/components/autocomplete/Autocomplete";
import libUser from "../lib/user";
import ErrorMessage from "../components/ErrorMessage";

export default {
  name: "profile-edit",
  components: {
    ProfileEditImage,
    ErrorMessage,
    BAutocomplete,
    BField,
    SectionTitle,
    ButtonRegisterProfile,
    FieldInputEdit,
    FieldSelectEdit,
    FieldCheckboxEdit
  },
  async mounted() {
    await this.$store.dispatch("user/fetchAuthUserProfile");
    if (this.userRegisted()) {
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
      hasValidationError: false,
      hasApiError: false,
      mailApproved: false
    };
  },
  computed: {
    nomadStatusOptions: function() {
      return this.$store.state.userOptions.nomadStatus;
    },
    smokingOptions: function() {
      return this.$store.state.userOptions.smoking;
    },
    drinkOptions: function() {
      return this.$store.state.userOptions.drink;
    },
    twitterUser: function() {
      return this.$store.state.twitter.user;
    },
    userProfile: function() {
      return this.$store.state.user.authUserProfile;
    },
    filteredLocations() {
      return this.$store.state.userOptions.locations.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.profile.location) >= 0
        );
      });
    }
  },
  methods: {
    userRegisted() {
      return this.userProfile && this.userProfile.id;
    },
    async saveProfile() {
      this.hasValidationError = !(await this.$validator.validate());
      if (this.hasValidationError) {
        return;
      }

      try {
        await this.$store.dispatch("route/enableLoading");
        await this.$store.dispatch("user/saveAuthUserProfile", {
          profile: this.profile
        });
        if (this.imageFile) {
          await libUser.putUserImageFile(
            this.userProfile,
            this.selectedImageData
          );
        }
      } catch (err) {
        console.log(err);
        this.hasApiError = true;
        await this.$store.dispatch("route/disableLoading");
        return;
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
.register-button
  margin 20px auto 60px

.attributes
  background #F5F5F5
  padding 42px 25px

.attributes-field
  margin-bottom 1rem

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
