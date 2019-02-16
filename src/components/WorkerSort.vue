<template lang="pug">
  div
    FieldSelect.field(
      v-model="sort"
      :options="sortOptions"
      v-on:input="changeSort()"
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
    async changeSort() {
      let sortConditions = {};
      if (this.sort === "recommended") {
        sortConditions = {
          type: "recommended"
        };
      } else {
        const optionArray = this.sort.split("--");
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
    }
  }
};
</script>

<style scoped lang="stylus"></style>
