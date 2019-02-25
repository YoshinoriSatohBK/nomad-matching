<template lang="pug">
  div.profile-image
    div.profile-edit-title
      SectionTitle(text="プロフィール設定")
    div.image-box
      img(:src="selectedImageData" v-if="selectedImageData")
      img(:src="imageUrl" v-else-if="imageUrl")
      img(src="@/assets/images/human.png" v-else)
    b-field.upload-field
      b-upload(@input="input")
        div.camera-icon-wrap
          b-icon.camera-icon(
            pack="fas"
            icon="camera"
            type="is-white"
            custom-size="profile-edit--camera-icon"
          )
</template>

<script>
export default {
  name: "ProfileEditImage",
  props: {
    selectedImageData: String,
    imageUrl: String
  },
  methods: {
    input(file) {
      this.$emit("input", file);
    }
  }
};
</script>

<style scoped lang="stylus">
.profile-image
  text-align center
  padding-top 20px
  padding-bottom 35px

.profile-edit-title
  text-align center

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
</style>

<style lang="stylus">
.profile-edit--camera-icon
  width 42.2px
  height 32.25px
  font-size 37px
  position relative
  top calc(50% - 19px)
  left calc(50% - 17px)
</style>
