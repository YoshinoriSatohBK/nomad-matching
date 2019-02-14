<template lang="pug">
  div
    FieldInput(
      type="text"
      placeholder="検索条件"
      v-model="conditions.text"
      v-on:input="changeCondition()"
      size="small"
    )
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
      await this.$store.dispatch("user/fetchPublicUserList");
    }
  }
};
</script>

<style scoped lang="stylus"></style>
