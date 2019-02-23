<template lang="pug">
  div
    select.field-select(
      :value="value"
      :style="style"
      @input="input"
    )
      option.option-placeholder(
        value=""
      ) {{ placeholder }}
      option.option(
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      ) {{ option.displayValue }}
    slot
</template>

<script>
export default {
  name: "FieldSelectBase",
  props: {
    placeholder: String,
    value: String,
    options: Array,
    selectStyle: Object,
    selectPlaceholderStyle: Object
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    }
  },
  computed: {
    style: function() {
      if (this.value === undefined) {
        return Object.assign({}, this.selectStyle, this.selectPlaceholderStyle);
      } else {
        return this.selectStyle;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../assets/styles/global.styl";

.field-select
  padding-left 0.7rem
  background white
  border #AF9772 1px solid
  border-radius 0
  -webkit-appearance: none
  -webkit-border-radius: 0px
  font-family font-family

.option-placeholder
  display none

.option
  padding 0
</style>
