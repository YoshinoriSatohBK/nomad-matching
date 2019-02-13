<template lang="pug">
  div
    FieldSelect.field(
      v-model="sort"
      :options="sortOptions"
      v-on="changeSort"
      size="small"
    )
</template>

<script>
import FieldSelect from "@/components/FieldSelect";
export default {
  name: "WorkerSort",
  components: {
    FieldSelect
  },
  data() {
    return {
      sort: "recommended",
      sortOptions: [
        {
          value: "recommended",
          displayValue: "おすすめ順"
        },
        {
          value: "income--desc",
          displayValue: "年収 高い順"
        }
      ]
    };
  },
  methods: {
    changeSort() {
      this.$store.dispatch("user/fetchPublicUserList");
    }
  }
};
</script>

<style scoped lang="stylus"></style>
