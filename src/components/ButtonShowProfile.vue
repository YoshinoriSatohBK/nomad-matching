<template lang="pug">
  div.button-parent-sm
    div.profile-button-border
      div(@click="showProfile()").profile-button
        div.profile-text プロフィールを見る
</template>

<script>
export default {
  name: "Buttonprofile",
  props: {
    userId: String
  },
  methods: {
    async showProfile() {
      this.$router.push(`/user/${this.userId}`);
    }
  }
};
</script>

<style scoped lang="stylus">
.button-parent-sm
  line-height 30px
  text-align center

.profile-button-border
  display inline-block
  height 30px
  width 150px
  background #A68C67

.profile-button
  display inline-block
  text-align center
  margin-top 2px
  height 26px
  width 146px
  background #A68C67
  color white
  font-size 10px
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
