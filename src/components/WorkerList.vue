<template lang="pug">
  div.nomad-list.section#nomad-list-scrollto
    div.mark-heart
      img(src="@/assets/images/mark_heart.png")
    SectionTitle(text="登録しているノマドワーカー")

    div.search-area.columns.is-mobile
      WorkerSort.column.worker-sort
      WorkerSearch.column.worker-search

    div.columns.is-mobile.is-multiline
      Worker(
        v-for="user in userList"
        :user="user"
        @matching="openMatchingModal"
      ).column

    div
      button.button(v-if="hasMoreUsers" @click="readMore") もっと見る
        b-loading(
          :active.sync="processingReadMore"
          :is-full-page="processingReadMoreOptions.isFullPage"
        )
    SendMessageModal(
      :active="isMatchingModalActive"
      :loading="sendMessageLoading"
      :userProfile="modalUser"
      @close="closeMatchingModal"
      @sendMessage="sendMessage"
    )
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import WorkerSort from "@/components/WorkerSort";
import WorkerSearch from "@/components/WorkerSearch";
import Worker from "@/components/Worker";
import SendMessageModal from "@/components/SendMessageModal";

export default {
  name: "WorkerList",
  components: {
    SectionTitle,
    Worker,
    WorkerSort,
    WorkerSearch,
    SendMessageModal
  },
  async mounted() {
    await this.$store.dispatch("user/fetchPublicUserList");
  },
  data() {
    return {
      isMatchingModalActive: false,
      mailMessage: "",
      sendMessageLoading: false,
      processingReadMore: false,
      processingReadMoreOptions: {
        isFullPage: false
      },
      modalUser: {}
    };
  },
  computed: {
    userList: function() {
      return this.$store.state.user.publicUserList;
    },
    hasMoreUsers: function() {
      return this.$store.state.user.hasMoreUsers;
    }
  },
  methods: {
    async readMore() {
      this.processingReadMore = true;
      await this.$store.dispatch("user/fetchPublicUserList", {
        mode: "read-more"
      });
      this.processingReadMore = false;
    },
    openMatchingModal(event) {
      console.log(event.user);
      this.modalUser = event.user;
      this.isMatchingModalActive = true;
    },
    closeMatchingModal() {
      this.modalUser = {};
      this.isMatchingModalActive = false;
    },
    sendMessage() {
      this.sendMessageLoading = true;
      const that = this;
      setTimeout(function() {
        that.sendMessageLoading = false;
        that.closeMatchingModal();
        that.$toast.open(
          "メッセージを送信しました（未実装です。実際にはまだ送信されません。）"
        );
      }, 2000);
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
