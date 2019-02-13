<template lang="pug">
  div
    FieldInput(
      type="text"
      placeholder="検索条件"
      v-model="conditions.text"
      v-on="changeCondition()"
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
    changeCondition() {
      this.$store.dispatch("user/fetchPublicUserList", {
        searchConditions: {
          text: this.conditions.text
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus"></style>
