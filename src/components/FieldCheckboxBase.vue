<template lang="pug">
  div
    div
      input.field-input(
        type="checkbox"
        v-model="checked"
        :style="inputStyle"
      )
      span.field-label {{ label }}
    slot
</template>

<script>
export default {
  name: "FieldCheckboxBase",
  props: {
    inputStyle: Object,
    label: String
  },
  watch: {
    checked: function(val) {
      console.log(val);
      this.$emit("input", val);
    }
  },
  data() {
    return {
      checked: false
    };
  }
};
</script>

<style scoped lang="stylus">
@import "../assets/styles/global.styl";

.field-input
  padding-left 1rem
  border #AF9772 1px solid
  border-radius 0%
  font-family font-family
  &::placeholder
    color: #AF9772
    font-family font-family

.field-label
  margin-left 1rem
</style>
