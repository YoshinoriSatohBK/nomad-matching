<template lang="pug">
  div.field
    input.field--input(
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      v-on="inputListeners"
    )
    slot
</template>

<script>
export default {
  name: "FieldInput",
  props: {
    type: String,
    placeholder: String,
    value: String
  },
  computed: {
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event.target.value);
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.field
  margin 0 0 1rem 0
  &--input
    width 100%
    height 43.68px
    padding-left 1rem
    border #AF9772 1px solid
    border-radius 0%
    font-family Hiragino Kaku Gothic ProN
    font-size 16px
    &::placeholder
      color: #AF9772
      font-family Hiragino Kaku Gothic ProN
      font-size 16px
</style>
