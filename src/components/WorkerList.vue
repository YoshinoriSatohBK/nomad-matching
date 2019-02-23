<template lang="pug">
  div.nomad-list.section
    div.mark-heart
      img(src="@/assets/images/mark_heart.png")
    SectionTitle(text="登録しているノマドワーカー")

    div.search-area.columns.is-mobile
      FieldSelectSort.column.worker-sort(
        :value="sort"
        @input="changeSort"
      )
      FieldInputSearch.column.worker-search(
        placeholder="検索条件"
        :value="searchConditions.text"
        @input="changeCondition"
      )

    div.columns.is-mobile.is-multiline
      Worker(
        v-for="user in userList"
        :user="user"
        @matching="openMatchingModal"
      ).column

    div
      ButtonReadMore(v-if="hasMoreUsers" @click="readMore") もっと見る
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
import FieldSelectSort from "@/components/FieldSelectSort";
import FieldInputSearch from "@/components/FieldInputSearch";
import Worker from "@/components/Worker";
import SendMessageModal from "@/components/SendMessageModal";
import ButtonReadMore from "@/components/ButtonReadMore";

// import apiMatching from "../api/auth";

export default {
  name: "WorkerList",
  components: {
    SectionTitle,
    Worker,
    FieldSelectSort,
    FieldInputSearch,
    SendMessageModal,
    ButtonReadMore
  },
  async mounted() {
    await this.$store.dispatch("user/fetchPublicUserList");
  },
  data() {
    return {
      isMatchingModalActive: false,
      searchConditions: {
        text: ""
      },
      sort: "recommended",
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
    async changeCondition(value) {
      this.searchConditions.text = value;
      await this.$store.dispatch("user/clearFilter");
      await this.$store.dispatch("user/saveFilter", {
        text: value
      });
      await this.$store.dispatch("user/fetchPublicUserList", {
        mode: "update-condition"
      });
    },
    async changeSort(value) {
      this.sort = value;
      let sortConditions = {};
      if (value === "recommended") {
        sortConditions = {
          type: "recommended"
        };
      } else {
        const optionArray = value.split("--");
        sortConditions = {
          field: optionArray[0],
          direction: optionArray[1]
        };
      }
      await this.$store.dispatch("user/clearSort");
      await this.$store.dispatch("user/saveSort", sortConditions);
      await this.$store.dispatch("user/fetchPublicUserList", {
        mode: "update-condition"
      });
    },
    async sendMessage(text) {
      this.sendMessageLoading = true;
      console.log(text);
      // await apiMatching.sendMessage(this.modalUser.id, text);
      this.sendMessageLoading = false;
      this.closeMatchingModal();
      this.$toast.open("メッセージを送信しました");
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
