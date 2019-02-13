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

    div.modal(:class="{ 'is-active': isMatchingModalActive}")
      div.modal-background
      div.modal-content
        header.modal-card-head
          p.modal-card-title ユーザーへメール送信
          button.delete(@click.stop="closeMatchingModal" aria-label="close")
        section.modal-card-body.section.body-modal
          b-field(label="メッセージ内容")
            b-input(type="textarea" v-model="mailMessage" placeholder="お茶しませんか？")
        footer.modal-card-foot
          button.button.is-info(@click.stop="sendMessage()") メールを送信する
          button.button(@click.stop="closeMatchingModal") Cancel
      b-loading(
        :active.sync="sendMessageLoading"
        :is-full-page="messageLoadingOption.isFullPage"
      )
</template>

<script>
import SectionTitle from "@/components/SectionTitle";
import WorkerSort from "@/components/WorkerSort";
import WorkerSearch from "@/components/WorkerSearch";
import Worker from "@/components/Worker";

export default {
  name: "WorkerList",
  components: {
    SectionTitle,
    Worker,
    WorkerSort,
    WorkerSearch
  },
  async mounted() {
    await this.$store.dispatch("user/fetchPublicUserList");
  },
  data() {
    return {
      isMatchingModalActive: false,
      mailMessage: "",
      sendMessageLoading: false,
      messageLoadingOption: {
        isFullPage: false
      }
    };
  },
  computed: {
    userList: function() {
      return this.$store.state.user.publicUserList;
    }
  },
  methods: {
    openMatchingModal() {
      this.isMatchingModalActive = true;
    },
    closeMatchingModal() {
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
