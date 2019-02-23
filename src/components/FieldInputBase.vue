<template lang="pug">
  div
    input.field-input(
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :style="inputStyle"
      @input="input"
    )
    slot
</template>

<script>
export default {
  name: "FieldInputBase",
  props: {
    type: String,
    placeholder: String,
    value: String,
    inputStyle: Object
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    }
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
</style>
