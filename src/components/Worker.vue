<template lang="pug">
  div.user-item
    div.profile-image
      img(:src="user.imageUrl")
    div.user-info
      div.user-info-name {{ user.name }}
      div.user-info-attr
        span.user-info-attr-item {{ user.location }}
        span.user-info-attr-item {{ user.skill }}
      div.user-info-attr
        span.user-info-attr-item {{ user.incomeRange }}
        span.user-info-attr-item {{ user.nomadStatus }}
    ButtonMatching.worker-button(:email="user.email")
    ButtonShowProfile.worker-button
</template>

<script>
import ButtonMatching from "@/components/ButtonMatching";
import ButtonShowProfile from "@/components/ButtonShowProfile";

export default {
  name: "Worker",
  components: {
    ButtonMatching,
    ButtonShowProfile
  },
  props: {
    user: Object
  }
};
</script>

<style scoped lang="stylus">
.profile-image
  margin-left auto
  margin-right auto
  img
    max-width 150px
    max-height 160px

.user-item
  width 50%
  margin-bottom 40px


.user-info
  color: #6C5A3F
  font-family Hiragino Kaku Gothic ProN
  text-align left
  margin-bottom 10px
  max-width 150px
  margin-left auto
  margin-right auto
  padding-left 2px
  &-name
    font-size 12px
    display inline-block
    margin-bottom 7px
  &-attr
    font-size 10px
    &-item
      display inline-block
      margin-right 10px

.worker-button
  margin 5px auto
</style>
