<template lang="pug">
  div.nomad-list.section#nomad-list-scrollto
    div.mark-heart
      img(src="@/assets/images/mark_heart.png")
    SectionTitle(text="登録しているノマドワーカー")
    div.columns.is-mobile.is-multiline
      Worker(v-for="user in userList" :user="user").column
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import Worker from "@/components/Worker";

export default {
  name: "WorkerList",
  components: {
    SectionTitle,
    Worker
  },
  async mounted() {
    await this.$store.dispatch("user/fetchPublicUserList");
  },
  computed: {
    userList: function() {
      return this.$store.state.user.publicUserList;
    }
  },
  methods: {
    async matching(user) {
      location.href =
        "mailto:" +
        user.email +
        "?subject=お茶しませんか" +
        "&body=お茶しませんか";
    }
  }
};
</script>

<style scoped lang="stylus">
.nomad-list
  text-align center
  margin 0px 0
  padding 30px !important

.mark-heart
  width 100%
  img
    display inline-block
    width 37.54px
    height 48.3px
</style>
