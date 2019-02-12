<template lang="pug">
  div.field
    select.select(
      v-model="value"
      v-on="inputListeners"
      :class="{ placeholder: isInitialValue }"
    )
      option.option-placeholder(
        value="null"
      ) {{ placeholder }}
      option.option(
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      ) {{ option.displayValue }}
    b-icon.angle-icon(
      pack="fas"
      icon="angle-down"
    )
</template>

<script>
export default {
  name: "FieldInput",
  props: {
    type: String,
    placeholder: String,
    value: String,
    options: Array
  },
  data() {
    return {
      placeholderStyle: {
        color: "blue"
      }
    };
  },
  computed: {
    isInitialValue: function() {
      return this.value === null;
    },
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

.select
  width 324px
  height 43.68px !important
  padding-left 0.7rem
  background white
  border #AF9772 1px solid
  border-radius 0%
  font-family Hiragino Kaku Gothic ProN
  font-size 16px

.placeholder
  color: #AF9772

.option-placeholder
  display none

.option
  padding 0

.angle-icon
  position relative
  top 10px
  left -25px
  width 0
</style>
