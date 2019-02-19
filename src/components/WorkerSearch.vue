<template lang="pug">
  div
    FieldInput(
      type="text"
      placeholder="検索条件"
      v-model="conditions.text"
      v-on:input="changeCondition()"
      size="small"
    )
      img.search-icon(
        v-if="conditions.text.length <= 0"
        src="@/assets/images/zoom.png"
      )
      div(v-else).search-icon
</template>

<script>
import FieldInput from "@/components/FieldInput";
export default {
  name: "WorkerSearch",
  components: {
    FieldInput
  },
  data() {
    return {
      conditions: {
        text: ""
      }
    };
  },
  methods: {
    async changeCondition() {
      await this.$store.dispatch("user/clearFilter");
      await this.$store.dispatch("user/saveFilter", {
        text: this.conditions.text
      });
      await this.$store.dispatch("user/fetchPublicUserList", {
        mode: "update-condition"
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.search-icon
  display inline-block
  position relative
  top 3px
  left -1.4rem
  width 15.9px
</style>
