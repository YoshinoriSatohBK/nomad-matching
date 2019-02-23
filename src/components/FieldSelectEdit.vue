<template lang="pug">
  div
    FieldSelectBase(
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :options="options"
      :selectStyle="selectStyle"
      :selectPlaceholderStyle="selectPlaceholderStyle"
      @input="input"
    )
      ErrorMessage(
        v-if="hasValidationError && errors.has(name)"
        :text="errors.first(name)"
      )
</template>

<script>
import FieldSelectBase from "@/components/FieldSelectBase";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "FieldSelectEdit",
  components: {
    FieldSelectBase,
    ErrorMessage
  },
  props: {
    placeholder: String,
    name: String,
    value: String,
    options: Array,
    errors: Object,
    hasValidationError: Boolean
  },
  data() {
    return {
      selectStyle: {
        width: "100%",
        height: "43.68px",
        "line-height": "100%",
        "font-size": "16px"
      },
      selectPlaceholderStyle: {
        color: "#AF9772"
      }
    };
  },
  methods: {
    async input(value) {
      await this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang="stylus">
.select-sm
  width 127px
  height 28.53px
  padding-left 0.7rem
  background white
  border #AF9772 1px solid
  border-radius 0%
  font-family Hiragino Kaku Gothic ProN
  font-size 12px
</style>
