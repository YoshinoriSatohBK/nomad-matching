<template lang="pug">
  div.user-item
    div.profile-image
      img(src="@/assets/images/human.png")
      // img(:src="user.imageUrl")
    div.user-info
      div.user-info-name {{ name }}
      div.user-info-attr
        span.user-info-attr-item {{ location }}
        span.user-info-attr-item {{ skill }}
      div.user-info-attr
        span.user-info-attr-item {{ incomeRange }}
        span.user-info-attr-item {{ nomadStatus }}
    div.button-parent-sm
      div.matching-button-border
        div(@click="matching(email)").matching-button
          div.matching-text お茶したい
</template>

<script>
const getIncomeRangeString = income => {
  if (income >= 0 && income < 400) {
    return "0〜400万";
  } else if (income >= 400 && income < 700) {
    return "400〜700万";
  } else if (income >= 700 && income < 1000) {
    return "700〜1000万";
  } else if (income >= 1000) {
    return "1000万以上";
  } else {
    return "未設定";
  }
};

const getNomadStatusString = nomadStatus => {
  if (nomadStatus === "nomad") {
    return "ノマド達成済み";
  } else {
    return "未設定";
  }
};
export default {
  name: "Worker",
  props: {
    user: Object
  },
  data() {
    return {
      name: this.user.name,
      email: this.user.email,
      location: this.user.location,
      skill: this.user.skill,
      incomeRange: getIncomeRangeString(this.user.income),
      nomadStatus: getNomadStatusString(this.user.nomadStatus),
      imageUrl: this.user.imageUrl
    };
  },
  methods: {
    async matching(email) {
      location.href =
        "mailto:" + email + "?subject=お茶しませんか" + "&body=お茶しませんか";
    }
  }
};
</script>

<style scoped lang="stylus">
.profile-image
  width 150px
  height 160px

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
  &-name
    font-size 12px
    display inline-block
    margin-bottom 7px
  &-attr
    font-size 10px
    &-item
      display inline-block
      margin-right 10px

.button-parent-sm
  line-height 30px
  text-align center

.matching-button-border
  display inline-block
  height 30px
  width 150px
  background #A68C67

.matching-button
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

.matching-text
  display inline-block
  position relative
  top -3px
</style>
