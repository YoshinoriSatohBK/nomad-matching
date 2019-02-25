<template lang="pug">
  div
    FieldSelectBase.field(
      :value="value"
      :options="sortOptions"
      :selectStyle="selectStyle"
      @input="input"
    )
</template>

<script>
import FieldSelectBase from "@/components/FieldSelectBase";
export default {
  name: "FieldSelectSort",
  components: {
    FieldSelectBase
  },
  props: {
    value: String
  },
  data() {
    return {
      selectStyle: {
        width: "140px",
        height: "28.53px",
        "line-height": "100%",
        "font-size": "12px"
      },
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
    async input(value) {
      await this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang="stylus"></style>
