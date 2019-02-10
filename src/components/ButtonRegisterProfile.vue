<template lang="pug">
  div.button-parent
    div.profile-button-border
      div(@click="saveProfile()").profile-button
        div.profile-text 登録する
</template>

<script>
export default {
  name: "ButtonRegisterProfile",
  methods: {
    async saveProfile() {
      this.$emit("save-profile");
    }
  }
};
</script>

<style scoped lang="stylus">
.button-parent
  width 100%
  height 53px
  line-height 53px
  margin 20px auto 0
  text-align center

.profile-button-border
  display inline-block
  height 53px
  width 234px
  background #A68C67

.profile-button
  display inline-block
  text-align center
  margin-top 3px
  height 47px
  width 228px
  background #A68C67
  color white
  font-size 14px
  font-weight bold
  font-family Hiragino Kaku Gothic ProN
  padding 0
  border-color white
  border-width 1px
  border-style solid

.profile-text
  display inline-block
  position relative
  top -3px
</style>
